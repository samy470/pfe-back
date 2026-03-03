import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Consul from "consul"; 
import * as controller from "./controllers/userController";
import client from "prom-client";
import Game from "./models/games";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ prefix: 'user_service_' });

const httpRequestCounter = new client.Counter({
  name: 'user_service_http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status']
});

const httpRequestDuration = new client.Histogram({
  name: 'user_service_http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestCounter.labels(req.method, req.path, res.statusCode.toString()).inc();
    httpRequestDuration.labels(req.method, req.path, res.statusCode.toString()).observe(duration);
  });
  next();
});

app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

mongoose.connect("mongodb://localhost:27017/userdb")
  .then(() => console.log("Mongo connected"))
  .catch(err => console.error(err));

app.post("/api/register", controller.register);
app.post("/api/login", controller.login);
app.get('/api/verify-email', controller.verifyEmail);

app.get("/api/games", async (req, res) => {
  const games = await Game.findAll();
  res.json(games);
});

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Running on ${PORT}`);
  const consulClient = new Consul({ host: "172.20.166.66", port: 8500 });

  consulClient.agent.service.register({
    name: "user-service",
    address: "172.20.160.1",
    port: Number(PORT),
    check: {
      http: `http://172.20.160.1:${PORT}/health`,
      interval: "10s"
    }
  } as any);
});

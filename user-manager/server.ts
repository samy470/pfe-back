import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Consul from "consul"; 
import * as controller from "./controllers/userController";
import client from "prom-client";

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Running on ${PORT}`);
  const consulClient = new Consul({ host: "localhost", port: 8500 });
  
    try {
    await consulClient.agent.service.register("user-service");
    console.log("Registered with Consul");
  } catch (err) {
    console.error("Consul registration failed:", err);
  }
  });

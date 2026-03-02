import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { getServiceUrl } from "./consul";
import jwt from "jsonwebtoken";
import axios from "axios"; 
import client from "prom-client";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.post("/api/login", async (req, res) => {
  try {
    const userServiceUrl = await getServiceUrl("user-service"); 
    const response = await axios.post(`${userServiceUrl}/api/login`, req.body);
    
    const token = jwt.sign(
  { id: response.data.id, username: response.data.username, role: response.data.role },
  "process.env.JWT_SECRET!",
  { expiresIn: "1h" }
);
    
    res.json({ token, user: response.data });
  } catch (error: any) {
    
    res.status(error.response?.status || 500).json(error.response?.data);
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const userServiceUrl = await getServiceUrl("user-service");
    const response = await axios.post(`${userServiceUrl}/api/register`, req.body);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json(error.response?.data);
  }
});

app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

app.listen(PORT, () => {
  console.log(`Gateway running on port ${PORT}`);
});
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import { getServiceUrl } from "./consul";
import { authenticate } from "./middleware/jwt";
import { authorize } from "./middleware/role";
import { Role } from "./roles/roles";
import axios from "axios"; 

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "UP",
    service: "gateway",
    timestamp: new Date(),
  });
});

app.get(
  "/api/auth/admin",
  authenticate,
  authorize(Role.ADMIN),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);

app.use("/api", async (req: Request, res: Response) => {
  try {
    const url = `http://localhost:5000${req.originalUrl}`;
    console.log(`Proxying: ${req.method} ${url}`);
    
    const response = await axios({
      method: req.method as any,
      url,
      data: req.body,
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers.authorization ? { Authorization: req.headers.authorization } : {})
      }
    });
    
    res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error('Proxy error:', error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || 'Gateway error'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Gateway running on port ${PORT}`);
});
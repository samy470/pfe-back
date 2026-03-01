import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import * as controller from "./controllers/userController";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/userdb")
  .then(() => console.log("Mongo connected"))
  .catch(err => console.error(err));

app.post("/api/register", controller.register);
app.post("/api/login", controller.login);
app.get('/api/verify-email', controller.verifyEmail);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running on ${PORT}`));
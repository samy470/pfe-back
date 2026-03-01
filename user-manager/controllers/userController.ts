import { Request, Response } from "express";
import * as authService from "../services/userService";

export const register = async (req: Request, res: Response) => {
  try {
    const {username, email, password, role } = req.body;
    const user = await authService.register(username, email, password, role);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    res.json({ token: result.token, username: result.username, role: result. role});
  } catch (err) {
    res.status(401).json({ message: (err as Error).message });
  }
};
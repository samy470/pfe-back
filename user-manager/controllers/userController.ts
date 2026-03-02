import { Request, Response } from "express";
import * as authService from "../services/userService";
import User from "../models/userModel";
import { UserExistsError } from "../exceptions/customErrors";

export const register = async (req: Request, res: Response) => {
  try {
    const {username, email, password, role } = req.body;
    const user = await authService.register(username, email, password, role);
    res.status(201).json(user);
  } catch (err) {
    if (err instanceof UserExistsError) {
    res.status(409).json({ message: err.message });
  } else {
    res.status(400).json({ message: (err as Error).message });
  }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    res.json({ id: result.id, username: result.username, role: result.role});
  } catch (err) {
    res.status(401).json({ message: (err as Error).message });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    
    const user = await User.findOne({
      verificationToken: token,
      verificationExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
    
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpires = undefined;
    await user.save();
    
    res.json({ message: 'Email verified successfully' });
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};
import { Request, Response, NextFunction } from "express";
import { Role } from "../roles/roles";

export const authorize =
  (...roles: Role[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
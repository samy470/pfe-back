import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { Role } from "../roles/roles"

export const register = async (
  username: string,
  email: string,
  password: string,
  role: string
) => {
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashed,
    role,
  });
  console.log("user", user);
  return user;
};

export const login = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");

  const token = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  return {token, username: user.username, role: user.role};
};
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { UserExistsError } from "../exceptions/customErrors";

export const register = async (
  username: string,
  email: string,
  password: string,
  role: string
) => {
      const existingUser = await User.findOne({
    $or: [{ email }, { username }]
  });
  
  if (existingUser) {
    if (existingUser.email === email) {
      throw new UserExistsError("Email already registered");
    }
    if (existingUser.username === username) {
      throw new UserExistsError("Username already taken");
    }
  }

  const hashed = await bcrypt.hash(password, 10);
  const verificationToken = crypto.randomBytes(32).toString('hex');
  const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const user = await User.create({
    username,
    email,
    password: hashed,
    role,
    verificationToken,
    verificationExpires,
    isVerified: false
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const verificationUrl = `http://localhost:3000/verify-email?token=${verificationToken}`;
  
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify your email',
    html: `<a href="${verificationUrl}">Click here to verify your email</a>`
  });
  
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

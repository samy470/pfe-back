import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import User from "../models/userModel";
import sgMail from '@sendgrid/mail';
import crypto from 'crypto';
import { UserExistsError } from "../exceptions/customErrors";

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//register
export const register = async (
  username: string,
  email: string,
  password: string,
  role: string
) => {
  const hashed = await bcrypt.hash(password, 10);
  const verificationToken = crypto.randomBytes(32).toString('hex');
  const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const verificationUrl = `http://localhost:3000/verify-email?token=${verificationToken}`;

  //check if user exists
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

  // create users
  const user = await User.create({
    username,
    email,
    password: hashed,
    role,
    verificationToken,
    verificationExpires,
    isVerified: false
  });

  //send verification email
  const msg = {
    to: email,
    from: 'messaoudi.191931046501@gmail.com', 
    subject: 'Verify your email',
    text: `Click this link to verify: ${verificationUrl}`,
    html: `<a href="${verificationUrl}">Click here to verify your email</a>`
  };
  try {
    await sgMail.send(msg);
    console.log('Verification email sent');
  } catch (error: any) {
    console.error('SendGrid error:', error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
  return user;
};

//login
export const login = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");

  return { id: user._id, username: user.username, role: user.role };
};

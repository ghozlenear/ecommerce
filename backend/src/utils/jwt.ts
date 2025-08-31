import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { IUser } from '../models/User';

export interface JwtPayload {
  userId: string;
  email: string;
}

export const generateToken = (user: IUser): string => {
  const payload: JwtPayload = {
    userId: (user._id as mongoose.Types.ObjectId).toString(),
    email: user.email
  };

  return jwt.sign(payload, process.env.JWT_SECRET || 'fallback-secret');
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as JwtPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
};
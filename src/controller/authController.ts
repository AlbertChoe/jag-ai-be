import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import prisma from '../config/prisma';

const authService = new AuthService(prisma);

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, password } = req.body;
    const { token } = await authService.login(username, password);
    res.json({ token, message: 'Logged in' });
  } catch (err) {
    next(err);
  }
};

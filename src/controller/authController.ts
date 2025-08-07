import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import prisma from '../config/prisma';
import { loginSchema, registerSchema } from '../schema/authSchemas';
import type { TypeOf } from 'zod';

type LoginInput = TypeOf<typeof loginSchema>['body'];
type RegisterInput = TypeOf<typeof registerSchema>['body'];

const authService = new AuthService(prisma);

export const register = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password, role } = req.body;
    const { token, user } = await authService.register(name, email, password, role);
    res.status(201).json({ token, user });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request<{}, {}, LoginInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const { token } = await authService.login(email, password);
    res.status(200).json({ token, message: 'Logged in' });
  } catch (err) {
    next(err);
  }
};

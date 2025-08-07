import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService';
import prisma from '../config/prisma';
import type { TypeOf } from 'zod';
import { updateUserSchema } from '../schema/userSchema';

type UpdateUserInput = TypeOf<typeof updateUserSchema>['body'];

const userService = new UserService(prisma);

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.getProfile(req.user!.userId);
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (
  req: Request<{}, {}, UpdateUserInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, location, phone } = req.body;
    const user = await userService.updateProfile(req.user!.userId, {
      name,
      location,
      phoneNumber: phone,
    });
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

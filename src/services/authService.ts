import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Role } from '../generated/prisma';

export class AuthService {
  constructor(private db: PrismaClient) {}

  async register(
    name: string,
    email: string,
    password: string,
    role: Role,
  ): Promise<{
    token: string;
    user: {
      userId: number;
      name: string;
      email: string;
      role: string;
      phoneNumber?: string;
      location?: string;
      createdAt: Date;
    };
  }> {
    const exists = await this.db.user.findUnique({ where: { email } });
    if (exists) throw new Error('Email already in use');

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.db.user.create({
      data: { name, email, passwordHash, role },
    });

    const token = jwt.sign({ userId: user.userId, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });
    delete user.passwordHash;

    return { token, user };
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.db.user.findUnique({ where: { email } });
    if (!user) throw new Error('Invalid credentials');

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new Error('Invalid credentials');

    const token = jwt.sign({ userId: user.userId, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    return { token };
  }
}

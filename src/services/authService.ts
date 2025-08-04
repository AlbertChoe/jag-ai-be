import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService {
  constructor(private db: PrismaClient) {}

  async login(username: string, password: string): Promise<{ token: string }> {
    const user = await this.db.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    return { token };
  }

  async register(
    username: string,
    password: string,
  ): Promise<{ token: string; user: { id: string; username: string } }> {
    const exists = await this.db.user.findUnique({ where: { username } });
    if (exists) throw new Error('Username already taken');

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.db.user.create({
      data: { username, passwordHash },
    });

    const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    return { token, user: { id: user.id, username: user.username } };
  }

  async getUser(userId: string): Promise<{ id: string; username: string }> {
    const user = await this.db.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true },
    });
    if (!user) throw new Error('User not found');
    return user;
  }
}

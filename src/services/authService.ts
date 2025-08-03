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
}

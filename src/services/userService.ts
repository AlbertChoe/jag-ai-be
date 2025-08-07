import { PrismaClient } from '@prisma/client';

export class UserService {
  constructor(private db: PrismaClient) {}

  async getProfile(userId: number) {
    const user = await this.db.user.findUnique({
      where: { userId },
      select: {
        userId: true,
        name: true,
        email: true,
        role: true,
        phoneNumber: true,
        location: true,
        createdAt: true,
      },
    });
    if (!user) throw new Error('User not found');
    return user;
  }

  async updateProfile(
    userId: number,
    data: { name?: string; location?: string; phoneNumber?: string },
  ) {
    const user = await this.db.user.update({
      where: { userId },
      data: {
        name: data.name,
        location: data.location,
        phoneNumber: data.phoneNumber,
      },
      select: {
        userId: true,
        name: true,
        email: true,
        role: true,
        phoneNumber: true,
        location: true,
        createdAt: true,
      },
    });
    return user;
  }
}

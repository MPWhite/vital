import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async userWithCompletedBouldersById(id: number) {
    return this.prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        displayName: true,
        BoulderAttempt: {
          include: {
            boulder: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      where: { id: id },
    });
  }

  async userByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}

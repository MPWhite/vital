import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserResponse } from '../sharedTypes/users.types';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async userWithCompletedBouldersById(
    id: number,
  ): Promise<UserResponse | null> {
    const user = await this.prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        displayName: true,
        profilePicUrl: true,
        BoulderCompletions: {
          select: {
            boulder: {
              select: {
                id: true,
                name: true,
                rating: true,
              },
            },
            attempts: true,
            createdAt: true,
          },
        },
      },
      where: { id: id },
    });
    if (!user) {
      return null;
    }
    return {
      id: user.id.toString(),
      email: user.email,
      displayName: user.displayName,
      profilePicUrl: user.profilePicUrl,
      completedBoulderDescriptions: user.BoulderCompletions.map(
        (boulderCompletion) => ({
          id: boulderCompletion.boulder.id.toString(),
          name: boulderCompletion.boulder.name,
          rating: boulderCompletion.boulder.rating,
          attempts: boulderCompletion.attempts,
          completionTime: boulderCompletion.createdAt,
        }),
      ),
    };
  }

  async userByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
  options = ["condie.jpeg", "honnold.png", "janja.jpeg", "lowe.jpeg", "ondra.jpeg"];
  async createUser(email: string, hashedPassword: string, displayName: string): Promise<User> {
    return this.prisma.user.create({
      data: {
        email,
        hashedPassword,
        displayName,
        profilePicUrl: `https://dl05ydgjha0pz.cloudfront.net/${this.options[Math.floor(Math.random() * this.options.length)]}`,
      },
    });
  }
}

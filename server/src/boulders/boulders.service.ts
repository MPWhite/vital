import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BouldersService {
  constructor(private prisma: PrismaService) {}

  async getBoulder(boulderId: number) {
    return this.prisma.boulder.findUnique({
      select: {
        id: true,
        name: true,
        active: true,
        xLocation: true,
        yLocation: true,
        namedBy: {
          select: {
            displayName: true,
          },
        },
        BoulderCompletions: {
          include: {
            user: {
              select: {
                id: true,
                displayName: true,
                profilePicUrl: true,
              },
            },
          },
        },
      },
      where: { id: boulderId },
    });
  }

  async getActiveBoulders() {
    return this.prisma.boulder.findMany({
      where: {
        active: true,
      },
    });
  }

  async recordAttempt(userId: number, boulderId: number) {
    await this.prisma.boulderAttempt.create({
      data: {
        userId,
        boulderId,
      },
    });
  }

  // TODO(!) This is completely untested
  async completeBoulder(userId: number, boulderId: number) {
    await this.prisma.boulderCompletion.create({
      data: {
        userId,
        boulderId,
        attempts: await this.prisma.boulderAttempt.count({
          where: {
            userId,
            boulderId,
          },
        }),
      },
    });
  }

  async setBoulderActive(boulderId: number, active: boolean) {
    await this.prisma.boulder.update({
      where: { id: boulderId },
      data: { active },
    });
  }

  async setBoulderName(userId: number, boulderId: number, name: string) {
    await this.prisma.boulder.update({
      where: { id: boulderId },
      data: { name, namedById: userId },
    });
  }

  async createBoulder(
    userId: number,
    name: string,
    rating: string,
    xLocation: number,
    yLocation: number,
  ) {
    await this.prisma.boulder.create({
      data: {
        name,
        rating: 'RED',
        xLocation,
        yLocation,
        addedById: userId,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BoulderResponse } from '../sharedTypes/boulders.types';

@Injectable()
export class BouldersService {
  constructor(private prisma: PrismaService) {}

  async getBoulder(boulderId: number): Promise<BoulderResponse> {
    const boulder = await this.prisma.boulder.findUnique({
      select: {
        id: true,
        name: true,
        primaryPhotoUrl: true,
        active: true,
        xLocation: true,
        yLocation: true,
        namedBy: {
          select: {
            displayName: true,
          },
        },
        BoulderCompletions: {
          select: {
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
    if (!boulder) {
      throw new Error('Boulder not found');
    }

    return {
      id: boulder.id.toString(),
      name: boulder.name,
      primaryPhotoUrl: boulder.primaryPhotoUrl,
      active: boulder.active,
      xLocation: boulder.xLocation,
      yLocation: boulder.yLocation,
      namedBy: boulder?.namedBy?.displayName,
      sends: boulder.BoulderCompletions.map((completion) => ({
        userId: completion.user.id.toString(),
        userProfilePicUrl: completion.user.profilePicUrl,
        userName: completion.user.displayName,
      })),
    };
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
        primaryPhotoUrl: 'TODO',
        rating: 'RED',
        xLocation,
        yLocation,
        addedById: userId,
      },
    });
  }
}

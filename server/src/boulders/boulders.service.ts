import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  BoulderResponse,
  BouldersResponse,
} from '../sharedTypes/boulders.types';
import { Location, Rating } from '@prisma/client';

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
        location: true,
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
        Tags: {
          select: {
            tag: true,
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
      tags: boulder.Tags.map((boulderTag) => String(boulderTag.tag.name)),
      location: boulder.location,
      sends: boulder.BoulderCompletions.map((completion) => ({
        userId: completion.user.id.toString(),
        userProfilePicUrl: completion.user.profilePicUrl,
        userName: completion.user.displayName,
      })),
    };
  }

  async getActiveBoulders(): Promise<BouldersResponse> {
    const x = await this.prisma.boulder.findMany({
      include: {
        namedBy: {
          select: {
            displayName: true,
          },
        },
        Tags: {
          select: {
            tag: true,
          },
        },
      },
      where: {
        active: true,
      },
    });

    return x.map((boulder) => ({
      id: boulder.id.toString(),
      name: boulder.name,
      primaryPhotoUrl: boulder.primaryPhotoUrl,
      rating: boulder.rating,
      xLocation: boulder.xLocation,
      yLocation: boulder.yLocation,
      namedBy: boulder?.namedBy?.displayName,
      tags: boulder.Tags.map((boulderTag) => String(boulderTag.tag.name)),
      location: boulder.location,
    }));
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

  // TODO: This should go away and we should use UUID instead
  async getNextBoulderId(): Promise<number> {
    return (await this.prisma.boulder.count()) + 1;
  }

  async createBoulder(
    primaryPhotoUrl: string,
    userId: number,
    name: string,
    rating: Rating,
    xLocation: number,
    yLocation: number,
    holdColor: string,
  ) {
    this.prisma.$transaction([]);
    await this.prisma.boulder.create({
      data: {
        name,
        primaryPhotoUrl,
        rating,
        xLocation,
        yLocation,
        addedById: userId,
        holdColor,
        location: Location.AMPHITHEATRE,
      },
    });
  }
}

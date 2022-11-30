import { Injectable } from '@nestjs/common';
import {User, Prisma} from "@prisma/client";
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async userByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {email}
    })
  }

}

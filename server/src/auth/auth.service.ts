import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateToken(token: string) {
    return this.jwtService.decode(token);
  }

  async login(email: string, rawPassword: string) {
    const maybeUser = await this.usersService.userByEmail(email);
    if (maybeUser && compareSync(rawPassword, maybeUser.hashedPassword)) {
      const { hashedPassword, ...user } = maybeUser;
      return {
        access_token: this.jwtService.sign(user),
      };
    }
    return null;
  }
}

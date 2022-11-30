import {Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {compareSync} from "bcrypt";


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  // async validateUser(username: string, password: string): Promise<any> {
  //   const user = await this.usersService.findOne(username);
  //   // TODO -- check this password instead with a bcrypt hash!
  //   if (user && user.password === password) {
  //     const {password, ...result} = user
  //     return result;
  //   }
  //   return null;
  // }

  async login(email: string, rawPassword: string) {
    const maybeUser = await this.usersService.userByEmail(email)
    if (maybeUser && compareSync(rawPassword, maybeUser.hashedPassword)) {
      const {hashedPassword, ...result} = maybeUser
      return result
    }
    return null
  }
}

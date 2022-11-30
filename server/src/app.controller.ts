import {Controller, Get, Post, UseGuards, Request, Body} from '@nestjs/common';
import {AppService} from './app.service';
import {AuthGuard} from "@nestjs/passport";
import {LocalAuthGuard} from "./auth/local-auth.guard";
import {AuthService} from "./auth/auth.service";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {ApiBody, ApiProperty} from "@nestjs/swagger";

class UserLoginDto {
  @ApiProperty()
  email: string

  @ApiProperty()
  password: string
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  };

  @UseGuards(LocalAuthGuard)
  @ApiBody({type: UserLoginDto})
  @Post('auth/login')
  async login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto.email, userLoginDto.password)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}

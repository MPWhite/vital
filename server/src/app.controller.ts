import {Controller, Get, Post, UseGuards, Request, Body} from '@nestjs/common';
import {AppService} from './app.service';
import {LocalAuthGuard} from "./auth/local-auth.guard";
import {AuthService} from "./auth/auth.service";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {ApiBearerAuth, ApiBody, ApiHeader, ApiProperty} from "@nestjs/swagger";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  };

}
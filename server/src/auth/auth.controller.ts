import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./local-auth.guard";
import {ApiBody, ApiProperty} from "@nestjs/swagger";

class UserLoginDto {
  @ApiProperty({example: 'mattp.white95+test-user-1@gmail.com'})
  email: string

  @ApiProperty({example: 'password'})
  password: string
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({type: UserLoginDto})
  @Post('/login')
  async login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto.email, userLoginDto.password)
  }

}

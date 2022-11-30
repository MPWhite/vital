import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';

class UserLoginDto {
  @ApiProperty({ example: 'mattp.white95+test-user-1@gmail.com' })
  email: string;

  @ApiProperty({ example: 'password' })
  password: string;
}

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: UserLoginDto })
  @Post('/login')
  async login(@Body() userRegisterDto: UserLoginDto) {
    console.log('login');
    console.log(userRegisterDto);
    return this.authService.login(
      userRegisterDto.email,
      userRegisterDto.password,
    );
  }
}

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

class UserRegisterDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // TODO type this
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: UserLoginDto })
  @Post('/login')
  async login(@Body() userLoginDto: UserLoginDto) {
    console.log('login');
    console.log(userLoginDto);
    return this.authService.login(
      userLoginDto.email,
      userLoginDto.password,
    );
  }

  @ApiBody({ type: UserRegisterDto })
  @Post('/register')
  async register(@Body() userRegisterDto: UserRegisterDto) {
    console.log('register');
    console.log(userRegisterDto);
    return this.authService.register(
      userRegisterDto.email,
      userRegisterDto.password,
    );
  }
}

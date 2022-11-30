import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';

class UserRegisterDto {
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
  @ApiBody({ type: UserRegisterDto })
  @Post('/Register')
  async Register(@Body() userRegisterDto: UserRegisterDto) {
    return this.authService.Register(
      userRegisterDto.email,
      userRegisterDto.password,
    );
  }
}

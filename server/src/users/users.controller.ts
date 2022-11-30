import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserResponse } from '../sharedTypes/users.types';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth('defaultBearerAuth')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<UserResponse> {
    const maybeUser = await this.users.userWithCompletedBouldersById(
      parseInt(id),
    );
    if (!maybeUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return maybeUser;
  }
}

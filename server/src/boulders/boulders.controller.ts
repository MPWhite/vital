import { Controller, Get } from '@nestjs/common';
import { BouldersService } from './boulders.service';

@Controller('boulders')
export class BouldersController {
  constructor(private readonly boulders: BouldersService) {}

  @Get('/')
  getBoulders(): string {
    return 'Hello World!';
  }
}

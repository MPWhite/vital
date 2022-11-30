import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { BouldersService } from './boulders.service';

@Module({
  imports: [PrismaModule],
  providers: [BouldersService],
  exports: [BouldersService],
})
export class BouldersModule {}

import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Param,
} from '@nestjs/common';
import { BouldersService } from './boulders.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Rating } from '@prisma/client';
import {
  BoulderResponse,
  BouldersResponse,
} from '../sharedTypes/boulders.types';

class SetBoulderNameDto {
  @IsNotEmpty()
  @ApiProperty({ example: '1' })
  boulderId: number;
  @IsNotEmpty()
  @IsEnum(Rating)
  @ApiProperty({ example: 'Megatron (but harder)' })
  name: string;
}

class CreateBoulderDto {
  @IsNotEmpty()
  @ApiProperty({ example: 50 })
  xLocation: number;
  @IsNotEmpty()
  @ApiProperty({ example: 50 })
  yLocation: number;
  @IsNotEmpty({})
  @ApiProperty({ example: 'Orange' })
  rating: string;
}

@Controller('boulders')
@ApiTags('boulders')
@ApiBearerAuth('defaultBearerAuth')
export class BouldersController {
  constructor(private readonly boulders: BouldersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/:boulderId/attempt')
  @ApiParam({ name: 'boulderId', example: '1' })
  recordAttempt(@Request() req, @Param() param: { boulderId: string }) {
    console.log('ATTEMPTED');
    return this.boulders.recordAttempt(req.user.id, parseInt(param.boulderId));
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:boulderId/complete')
  @ApiParam({ name: 'boulderId', required: true })
  complete(@Request() req, @Param() param: { boulderId: string }) {
    console.log('COMPLETED');
    return this.boulders.completeBoulder(
      req.user.id,
      parseInt(param.boulderId),
    );
  }

  @Get('/')
  getActiveBoulders(): Promise<BouldersResponse> {
    return this.boulders.getActiveBoulders();
  }

  @Get('/:boulderId')
  @ApiParam({ name: 'boulderId', example: '1' })
  getBoulder(@Param() param: { boulderId: string }): Promise<BoulderResponse> {
    return this.boulders.getBoulder(parseInt(param.boulderId));
  }

  @UseGuards(JwtAuthGuard)
  @Post(':boulderId/set-name')
  @ApiBody({ type: SetBoulderNameDto })
  @ApiParam({ name: 'boulderId', example: '1' })
  setBoulderName(
    @Request() req,
    @Param() param: { boulderId: string },
    @Body() boulder: SetBoulderNameDto,
  ) {
    return this.boulders.setBoulderName(
      req.user.id,
      parseInt(param.boulderId),
      boulder.name,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  @ApiBody({ type: CreateBoulderDto })
  createBoulder(@Request() req, @Body() boulder: CreateBoulderDto) {
    // random 4 alphanumeric characters
    const randomId = Math.random().toString(36).substring(2, 5).toUpperCase();
    return this.boulders.createBoulder(
      req.user.id,
      `Project-${randomId}`,
      boulder.rating,
      boulder.xLocation,
      boulder.yLocation,
    );
  }
}

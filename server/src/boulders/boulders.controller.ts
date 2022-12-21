import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { BouldersService } from './boulders.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from '../s3/s3.service';
import { Location } from '@prisma/client';

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
  // TODO -- this should be number, but I'm not sure why it won't work
  xLocation: string;
  @IsNotEmpty()
  @ApiProperty({ example: 50 })
  yLocation: string;
  @IsNotEmpty({})
  @ApiProperty({ example: 'Orange' })
  rating: string;
  @IsNotEmpty()
  @ApiProperty({ example: 'red' })
  holdColor: string;
  @IsNotEmpty()
  @ApiProperty({ example: 'AMPHITHEATER' })
  @IsEnum(Location)
  location: string;
}

@Controller('boulders')
@ApiTags('boulders')
@ApiBearerAuth('defaultBearerAuth')
export class BouldersController {
  constructor(
    private readonly boulders: BouldersService,
    private readonly s3: S3Service,
  ) {}

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
  @UseInterceptors(FileInterceptor('file'))
  async createBoulder(
    @Request() req,
    @Body() boulder: CreateBoulderDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    const fileType = file.originalname.split('.')[1];
    const key = Math.random().toString(36).substring(7) + '.' + fileType;
    await this.s3.uploadFile(file, key);
    const randomId = Math.random().toString(36).substring(2, 5).toUpperCase();
    return this.boulders.createBoulder(
      `https://dl05ydgjha0pz.cloudfront.net/${key}`,
      req.user.id,
      `Project-${randomId}`,
      boulder.rating as Rating,
      parseFloat(boulder.xLocation),
      parseFloat(boulder.yLocation),
      boulder.holdColor,
      // @ts-ignore
      boulder.location,
    );
  }
}

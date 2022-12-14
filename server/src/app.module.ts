import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppLoggerMiddleware } from './middleware/app-logger.middleware';
import { BouldersController } from './boulders/boulders.controller';
import { BouldersService } from './boulders/boulders.service';
import { BouldersModule } from './boulders/boulders.module';
import { PrismaModule } from './prisma/prisma.module';
import { S3Service } from './s3/s3.service';

@Module({
  imports: [AuthModule, UsersModule, BouldersModule, PrismaModule],
  controllers: [AppController, BouldersController],
  providers: [AppService, BouldersService, S3Service],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}

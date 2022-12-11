import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set up Swagger
  const config = new DocumentBuilder()
    .setTitle('Vital Beta Swagger')
    .setDescription('Vital Beta API Description')
    .setVersion('0.1')
    .addBearerAuth(undefined, 'defaultBearerAuth')
    .build();

  const options = {
    explorer: true,
    swaggerOptions: {
      authAction: {
        defaultBearerAuth: {
          name: 'defaultBearerAuth',
          schema: {
            description: 'Default',
            type: 'http',
            in: 'header',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
          value:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXR0cC53aGl0ZTk1K3Rlc3QtdXNlci0xQGdtYWlsLmNvbSIsImRpc3BsYXlOYW1lIjoiVGVzdCBVc2VyIDEiLCJjcmVhdGVkQXQiOiIyMDIyLTExLTI2VDIwOjEzOjE3LjU4NloiLCJpYXQiOjE2Njk0OTU1NjYsImV4cCI6MjAyOTQ5NTU2Nn0.gl3COwxPObXxNney-o5rC6nM-SCP20DD7igyEwofVAI',
        },
      },
    },
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, options);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3001);
}

bootstrap().then((r) => {
  console.log('🏃🏃🏃');
});

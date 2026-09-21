import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // Global Prefix
  app.setGlobalPrefix('/api/v1');

  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

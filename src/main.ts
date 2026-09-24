import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // Global Filters
   app.useGlobalFilters(new HttpExceptionFilter());
  // Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // Global Prefix
  app.setGlobalPrefix('/api/v1');

  const config = new DocumentBuilder()
    .setTitle('API Title')
    .setDescription('API Description')
    .setVersion('1.0')
    .addTag('tag-name')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api-docs', app, document);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

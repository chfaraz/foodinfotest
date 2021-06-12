import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(port);

  console.log(process.env.NODE_ENV);
  console.log(process.env.DB_PORT);
  console.log(process.env.DB_NAME);
  console.log(process.env.DB_HOST);
  console.log(process.env.DB_USER_NAME);
  console.log(process.env.DB_PASSWORD);
  console.log(process.env.JWT_SECRET);
}
bootstrap();

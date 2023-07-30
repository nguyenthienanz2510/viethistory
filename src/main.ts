import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

const PORT = 4000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(path.join(__dirname, '../public'));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
  console.log(`Application listening on port ${PORT}`);
}
bootstrap();

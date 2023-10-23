import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

const DEFAULT_PORT = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  dotenv.config();
  const PORT = Number(process.env.PORT || DEFAULT_PORT);
  await app.listen(PORT);

  app.enableCors();
}
bootstrap();

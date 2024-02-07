import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const DEFAULT_PORT = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Online Store API')
    .setDescription('The Online Store API description')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  dotenv.config();
  const PORT = Number(process.env.PORT || DEFAULT_PORT);
  await app.listen(PORT);

  app.enableCors({
    origin: true,
    // origin: ['http://localhost:5173', 'https://online-store-react-94.netlify.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
}
bootstrap();

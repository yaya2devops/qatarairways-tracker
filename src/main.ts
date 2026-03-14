import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'warn', 'error', 'debug', 'verbose'],
  });
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Qatar Airways Tracker running on http://localhost:${port}`);
  console.log(`Management API: GET /flights  POST /flights  DELETE /flights/:id`);
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'https://diwidi.net',
      'https://www.diwidi.net',
      'https://dev.diwidi.net',
      'http://localhost:4200',
    ],
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();


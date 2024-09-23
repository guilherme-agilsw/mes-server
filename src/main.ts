import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:5173', // Specify the allowed origin
    methods: 'GET,POST,PUT,DELETE',  // Specify allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Specify allowed headers
    credentials: true, // If you're using cookies or auth headers
  };

  app.enableCors(corsOptions);

  await app.listen(3000);
}
bootstrap();

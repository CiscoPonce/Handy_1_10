import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Use PORT from environment or default to 10000
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 10000;
  
  await app.listen(port, '0.0.0.0', () => {
    console.log(`Application is running on port ${port}`);
  });
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for Android app
  app.enableCors({
    origin: [
      'http://localhost:3000', // Local development
      'https://handy-1-10.onrender.com', // Render deployment
      /^https?:\/\/.*\.onrender\.com$/, // Any Render subdomain
      /^http:\/\/localhost:\d+$/, // Any local development port
      // Add your Android app's domain or IP here
      'http://192.168.1.100:8081', // Example local Android emulator IP
      'capacitor://localhost', // Capacitor default localhost
      'ionic://localhost', // Ionic default localhost
      'http://localhost', // Generic localhost
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
  });
  
  // Use PORT from environment or default to 10000
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 10000;
  
  await app.listen(port, '0.0.0.0', () => {
    console.log(`Application is running on port ${port}`);
  });
}
bootstrap();

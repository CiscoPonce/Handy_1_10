import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  healthCheck() {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    };
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose']
  });
  
  // Set global prefix for all routes
  app.setGlobalPrefix('api');
  
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
      '*' // Temporary: allow all origins for debugging
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    disableErrorMessages: false, // Keep error messages for debugging
  }));
  
  // Debugging: Log all registered routes
  const app_ref = app.getHttpAdapter();
  const server = app_ref.getInstance();
  
  if (server && server._router) {
    console.log('Registered Routes:');
    server._router.stack.forEach((r) => {
      if (r.route && r.route.path) {
        console.log(`${Object.keys(r.route.methods).join(', ').toUpperCase()} ${r.route.path}`);
      }
    });
  }
  
  // Use PORT from environment or default to 10000
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 10000;
  
  console.log('Starting application with the following configuration:');
  console.log(`Port: ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Global Prefix: /api`);
  
  await app.listen(port, '0.0.0.0', () => {
    console.log(`Application is running on port ${port}`);
  });
}
bootstrap();

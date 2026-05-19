import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitamos CORS para que tu Angular (frontend) pueda hacerle peticiones sin bloqueos de seguridad
  app.enableCors({
    origin: '*', // Permite que cualquier IP consuma la API
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  await app.listen(3000, '0.0.0.0');
  console.log('🚀 Servidor del billar corriendo en la red local puerto 3000');
}
bootstrap();
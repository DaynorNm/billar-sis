import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitamos CORS para que tu Angular (frontend) pueda hacerle peticiones sin bloqueos de seguridad
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Servidor del billar corriendo en: http://localhost:3000`);
}
bootstrap();
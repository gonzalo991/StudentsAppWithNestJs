import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// Importamos el ConfigService de nest previamente instalado con npm
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Creamos una constante de ConfigService para poder usar las variables de entorno
  const configService = app.get(ConfigService);
  // Definimos el host de la app
  const host = configService.get<string>('host') || "0.0.0.0"
  // Definimos la constante para puerto a partir de ConfigService
  const port = configService.get<number>('port') || 3000;
  await app.listen(port, host);
}

bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobal } from './middlewares/LoggerGlobal';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }))
  app.use(LoggerGlobal);
  const swaggerConfig = new DocumentBuilder()
  .setTitle('E-commerce-api')
  .setDescription('Ésta es una api empleada para un sistema de e-commerce del modulo 4 de la especialidad de backend')
  .setVersion('1.0')
  .addBearerAuth()
  .build()

  const document =  SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document)
  await app.listen(3000);
}

bootstrap();

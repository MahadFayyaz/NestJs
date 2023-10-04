import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'), app.enableCors();
  app.useGlobalGuards();

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Home assignment')
    .setVersion('1.0')
    .addTag('Api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT; // Change to an available port
  await app.listen(port);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './user/jwt-auth.guard';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'),
  app.useGlobalGuards(new JwtAuthGuard());
  await app.listen(3000);
}
bootstrap();

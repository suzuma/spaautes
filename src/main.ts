
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';





async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));
//  await app.listen(3000,'100.20.92.101' || 'locahost');
  await app.listen(3000, '0.0.0.0');
}
bootstrap();

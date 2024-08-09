
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';





async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));
  //await app.listen(3000,'192.168.0.151' || 'locahost');
  await app.listen(10000, '0.0.0.0');
}
bootstrap();

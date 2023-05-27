import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('port');
  const logger = new Logger('Application');
  await app.listen(PORT).then(() => {
    logger.log('Application listening on port:', PORT);
  }).catch((error) => {
    logger.error('Application failed to start:', error);
  });
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app.module';
import { ConfigService } from '@nestjs/config';
import { logger } from '@logger/tslog.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: false,
  });
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.get('SERVER_PORT'));
  logger.info(
    `Application started to listen at ${configService.get('SERVER_PORT')}`,
  );
}
bootstrap();

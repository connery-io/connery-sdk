import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const runnerPort = 4201;
  const app = await NestFactory.create(AppModule);
  await app.listen(runnerPort);
  console.log(`✅ Runner is successfully started on port ${runnerPort}`);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  const runnerPort = 4201;
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(runnerPort);
  console.log(`✅ Runner is successfully started on port ${runnerPort}`);
}
bootstrap();

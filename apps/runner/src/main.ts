import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  const runnerPort = 4201;
  // CORS is required for the OpenAPI specification.
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(runnerPort);
  console.log(`✅ Runner is successfully started on port ${runnerPort}`);
}
bootstrap();

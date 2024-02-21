import { NestFactory } from '@nestjs/core';
import { AppModule } from '../api/app.module';
import { AllExceptionsFilter } from '../api/all-exceptions.filter';

async function bootstrap() {
  const runnerPort = 4201;
  // CORS is required for the OpenAPI specification.
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(runnerPort);
  console.log(`✅ The plugin is running on port ${runnerPort}`);
}
bootstrap();

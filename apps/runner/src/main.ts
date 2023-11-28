import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  // CORS is required for the OpenAPI specification.
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder().setTitle('Connery Runner API').setVersion('0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new AllExceptionsFilter());

  const runnerPort = 4201;
  await app.listen(runnerPort);
  console.log(`✅ Runner is successfully started on port ${runnerPort}`);
}
bootstrap();

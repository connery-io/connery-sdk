import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { AllExceptionsFilter } from './all-exceptions.filter.js';
import { PluginDefinition } from './../types/definition.js';

export async function serve(pluginDefinition: PluginDefinition) {
  // CORS is required for the OpenAPI specification.
  const app = await NestFactory.create(AppModule, { cors: true });

  const appModule = app.get(AppModule);
  //appModule.configure(pluginDefinition);

  app.useGlobalFilters(new AllExceptionsFilter());

  const runnerPort = 4201;
  await app.listen(runnerPort);
  console.log(`✅ The plugin is running on port ${runnerPort}`);
}

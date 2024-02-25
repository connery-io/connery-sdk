import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { AllExceptionsFilter } from './all-exceptions.filter.js';
import { PluginDefinition } from './../types/definition.js';
import { Plugin } from './../runtime/plugin.js';

export async function serve(pluginDefinition: PluginDefinition) {
  const app = await NestFactory.create(AppModule, {
    cors: true, // CORS is required for the OpenAPI specification
    logger: false,
  });

  const plugin = new Plugin(pluginDefinition);

  const appModule = app.get(AppModule);
  appModule.configure(plugin);

  app.useGlobalFilters(new AllExceptionsFilter());

  const runnerPort = 4201;
  await app.listen(runnerPort);
  console.log(`✅ The plugin is running on port ${runnerPort}`);
}

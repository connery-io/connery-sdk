import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { AllExceptionsFilter } from './all-exceptions.filter.js';
import { PluginDefinition } from './../types/definition.js';
import { Plugin } from './../runtime/plugin.js';
import { PluginService } from './services/plugin.service.js';

export async function serve(pluginDefinition: PluginDefinition) {
  const app = await NestFactory.create(AppModule, {
    cors: true, // CORS is required for the OpenAPI specification
    logger: false,
  });

  const plugin = new Plugin(pluginDefinition);
  const pluginService = app.get(PluginService);
  pluginService.plugin = plugin;

  app.useGlobalFilters(new AllExceptionsFilter());

  const runnerPort = 4201;
  await app.listen(runnerPort);
  console.log(`✅ The plugin is running on port ${runnerPort}`);
}

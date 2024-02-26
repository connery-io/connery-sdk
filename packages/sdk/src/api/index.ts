import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { AllExceptionsFilter } from './all-exceptions.filter.js';
import { PluginDefinition } from '../types/definition.js';
import { Plugin } from '../runtime/plugin.js';
import { PluginService } from './services/plugin.service.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export async function serve(pluginDefinition: PluginDefinition) {
  const app = await NestFactory.create(AppModule, {
    cors: true, // CORS is required for the OpenAPI specification
    logger: false,
  });

  initPlugin(app, pluginDefinition);
  initOpeApiSpec(app);

  app.useGlobalFilters(new AllExceptionsFilter());

  const runnerPort = 4201;
  await app.listen(runnerPort);
  console.log(`✅ The plugin is running on port ${runnerPort}`);
}

function initPlugin(app: INestApplication, pluginDefinition: PluginDefinition) {
  const plugin = new Plugin(pluginDefinition);
  const pluginService = app.get(PluginService);
  pluginService.plugin = plugin;
}

function initOpeApiSpec(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Plugin API')
    .setDescription('This is an OpenAPI specification for the Connery plugin and its actions.')
    //.setVersion() // TODO: add version from package.json
    .addApiKey({ type: 'apiKey', in: 'header', name: 'x-api-key' }, 'API Key')
    .addTag('Plugin')
    .addTag('Actions')
    .addTag('OpenAI', 'Specifications for integration with OpenAI.')
    .addTag('Tools', 'Different tooling endpoints.')
    //.addServer('http://localhost:4201', 'Plugin URL') // TODO: add server
    .build();
  const document = SwaggerModule.createDocument(app, config);
  document.externalDocs = {
    description: 'Connery Documentation',
    url: 'https://docs.connery.io/',
  };

  SwaggerModule.setup('api', app, document);
}

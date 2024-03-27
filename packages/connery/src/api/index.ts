import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { AllExceptionsFilter } from './all-exceptions.filter.js';
import { PluginDefinition } from '../types/definition.js';
import { Plugin } from '../core/plugin.js';
import { PluginService } from './services/plugin.service.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { PluginConfigService } from './services/plugin-config.service.js';
import { logError, logSuccess } from '../cli/shared.js'; // TODO move this out of CLI and share between CLI and SDK

export async function startPluginServer(pluginDefinition: PluginDefinition) {
  try {
    const app = await NestFactory.create(AppModule, {
      cors: true,
      logger: false,
    });

    initPlugin(app, pluginDefinition);
    await initOpeApiSpec(app);

    app.useGlobalFilters(new AllExceptionsFilter());

    await app.listen(4201);
    logSuccess(`The plugin server is up and running. You can access it in a browser at http://localhost:4201.`);
  } catch (error: any) {
    logError(error);
  }
}

function initPlugin(app: INestApplication, pluginDefinition: PluginDefinition) {
  const plugin = new Plugin(pluginDefinition);
  const pluginService = app.get(PluginService);
  pluginService.plugin = plugin;
}

async function initOpeApiSpec(app: INestApplication) {
  const pluginConfigService = app.get(PluginConfigService);
  const sdkVersion = await pluginConfigService.getSdkVersion();

  const config = new DocumentBuilder()
    .setTitle('Plugin API')
    .setDescription(`This is a standartized API genarated by Connery SDK (${sdkVersion}) for the plugin.`)
    .setVersion(sdkVersion)
    .addApiKey({ type: 'apiKey', in: 'header', name: 'x-api-key' }, 'ApiKey')
    .addTag('Plugin')
    .addTag('Actions')
    .addTag('Specs', 'Action specifications for different clients.')
    .addTag('Tools', 'Different tooling endpoints.')
    .addServer(pluginConfigService.pluginUrl, 'Plugin URL')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    customfavIcon: '',
    customSiteTitle: 'Plugin API',
    customCss: `
      .swagger-ui .topbar { display: none } `,
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}

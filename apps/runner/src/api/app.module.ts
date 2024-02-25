import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ActionsController } from './controllers/actions.controller.js';
import { PluginsController } from './controllers/plugins.controller.js';
import { ToolsController } from './controllers/tools.controller.js';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { OpenAiSpecsService } from './services/openai-specs.service.js';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard.js';
import { OpenAiController } from './controllers/openai.controller.js';
import { PluginService } from './services/plugin.service.js';

@Module({
  imports: [
    TerminusModule, // required for health checks
    HttpModule, // required for health checks
    ConfigModule.forRoot(),
    ConfigModule,
  ],
  controllers: [ActionsController, OpenAiController, PluginsController, ToolsController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    OpenAiSpecsService,
    PluginService,
  ],
})
export class AppModule {}

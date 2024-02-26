import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ActionsController } from './controllers/actions.controller.js';
import { PluginController } from './controllers/plugin.controller.js';
import { ToolsController } from './controllers/tools.controller.js';
import { OpenAiSpecsService } from './services/openai-specs.service.js';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard.js';
import { OpenAiController } from './controllers/openai.controller.js';
import { PluginService } from './services/plugin.service.js';

@Module({
  imports: [ConfigModule.forRoot(), ConfigModule],
  controllers: [ActionsController, OpenAiController, PluginController, ToolsController],
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

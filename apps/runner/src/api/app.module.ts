import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from '../../connery-runner.config';
import { ActionsController } from './controllers/actions.controller';
import { PluginsController } from './controllers/plugins.controller';
import { ToolsController } from './controllers/tools.controller';
import { HealthController } from './controllers/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { OpenApiService } from './openapi/openapi.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { IConfig } from './config/config.interface';
import { LocalConfigService } from './config/local-config.service';
import { IPluginCache } from './plugin-cache/plugin-cache.interface';
import { MemoryCacheService } from './plugin-cache/memory-cache.service';
import { ILlm } from './llm/llm.interface';
import { OpenAiService } from './llm/openai.service';
import { IOpenAI } from './llm/openai.interface';

@Module({
  imports: [
    TerminusModule, // usef for health checks
    HttpModule, // used for health checks
    ConfigModule.forRoot({
      load: [config],
    }),
    ConfigModule,
  ],
  controllers: [ActionsController, PluginsController, ToolsController, HealthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: IConfig,
      useClass: LocalConfigService,
    },
    {
      provide: IPluginCache,
      useClass: MemoryCacheService,
    },
    {
      provide: ILlm,
      useClass: OpenAiService,
    },
    {
      provide: IOpenAI,
      useClass: OpenAiService,
    },
    OpenApiService,
  ],
})
export class AppModule {}

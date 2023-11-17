import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LocalConfigService } from './config/local-config.service';
import { MemoryCacheService } from './plugin-cache/memory-cache.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { OpenAiService } from './llm/openai.service';
import { IConfig } from './config/config.interface';
import { IPluginCache } from './plugin-cache/plugin-cache.interface';
import { ILlm } from './llm/llm.interface';
import { OpenApiForActions } from './openapi-for-actions';
import { OpenAiFucntionsForActions } from './openai-functions-for-actions';

@Module({
  imports: [ConfigModule],
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
    OpenApiForActions,
    OpenAiFucntionsForActions,
  ],
  exports: [IConfig, IPluginCache, ILlm, OpenApiForActions, OpenAiFucntionsForActions],
})
export class SharedModule {}

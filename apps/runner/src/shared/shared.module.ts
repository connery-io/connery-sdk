import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LocalConfigService } from './local-config.service';
import { PluginInMemoryCacheService } from './plugin-in-memory-cache.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { OpenAiService } from './openai.service';

@Module({
  imports: [ConfigModule],
  providers: [
    LocalConfigService,
    PluginInMemoryCacheService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    OpenAiService,
  ],
  exports: [PluginInMemoryCacheService, LocalConfigService, OpenAiService],
})
export class SharedModule {}

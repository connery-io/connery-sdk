import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LocalConfigService } from './config/local-config.service';
import { MemoryCacheService } from './plugin-cache/memory-cache.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { OpenAiService } from './llm/openai.service';

@Module({
  imports: [ConfigModule],
  providers: [
    LocalConfigService,
    MemoryCacheService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    OpenAiService,
  ],
  exports: [MemoryCacheService, LocalConfigService, OpenAiService],
})
export class SharedModule {}

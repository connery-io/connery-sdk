import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LocalConfigService } from './local-config.service';
import { ConnectorsService } from './connectors.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { OpenAiService } from './openai.service';

@Module({
  imports: [ConfigModule],
  providers: [
    LocalConfigService,
    ConnectorsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    OpenAiService,
  ],
  exports: [ConnectorsService, LocalConfigService, OpenAiService],
})
export class SharedModule {}

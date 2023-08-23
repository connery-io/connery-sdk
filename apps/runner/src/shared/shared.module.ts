import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LocalConfigService } from './local-config.service';
import { RequestService } from './request.service';
import { ConnectorsService } from './connectors.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { OpenAiService } from './openai.service';
import { MakeService } from './make.service';

@Module({
  imports: [ConfigModule],
  providers: [
    LocalConfigService,
    RequestService,
    ConnectorsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    OpenAiService,
    MakeService,
  ],
  exports: [ConnectorsService, RequestService, LocalConfigService, OpenAiService, MakeService],
})
export class SharedModule {}

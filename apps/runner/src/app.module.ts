import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { MakeModule } from './make/make.module';
import { SharedModule } from './shared/shared.module';
import { ToolsModule } from './tools/tools.module';
import config from '../connery-runner.config';
import { OpenAiModule } from './openai/openai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    HealthModule,
    MakeModule,
    SharedModule,
    ToolsModule,
    OpenAiModule,
  ],
})
export class AppModule {}

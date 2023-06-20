import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { MakeModule } from './make/make.module';
import { NativeModule } from './native/native.module';
import { SharedModule } from './shared/shared.module';
import { ToolsModule } from './tools/tools.module';
import config from './config';
import { OpenAiModule } from './openai/openai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    HealthModule,
    MakeModule,
    NativeModule,
    SharedModule,
    ToolsModule,
    OpenAiModule,
  ],
})
export class AppModule {}

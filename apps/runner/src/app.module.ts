import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { SharedModule } from './shared/shared.module';
import { ToolsModule } from './tools/tools.module';
import config from '../connery-runner.config';
import { ConnectorsAndActionsModule } from './connectors-and-actions/connectors-and-actions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    HealthModule,
    SharedModule,
    ToolsModule,
    ConnectorsAndActionsModule,
  ],
})
export class AppModule {}

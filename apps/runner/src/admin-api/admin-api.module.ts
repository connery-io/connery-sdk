import { Module } from '@nestjs/common';
import { SharedModule } from ':src/shared/shared.module';
import { PluginsController } from './connectors.controller';

@Module({
  imports: [SharedModule],
  controllers: [PluginsController],
})
export class AdminApiModule {}

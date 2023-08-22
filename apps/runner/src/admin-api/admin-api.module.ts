import { Module } from '@nestjs/common';
import { SharedModule } from ':src/shared/shared.module';
import { ConnectorsController } from './connectors.controller';

@Module({
  imports: [SharedModule],
  controllers: [ConnectorsController],
})
export class AdminApiModule {}

import { Module } from '@nestjs/common';
import { ActionsController } from './actions.controller';
import { SharedModule } from ':src/shared/shared.module';
import { ConnectorsController } from './connectors.controller';

@Module({
  imports: [SharedModule],
  controllers: [ActionsController, ConnectorsController],
})
export class ConnectorsAndActionsModule {}

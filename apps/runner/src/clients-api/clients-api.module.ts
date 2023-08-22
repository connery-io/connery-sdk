import { Module } from '@nestjs/common';
import { SharedModule } from ':src/shared/shared.module';
import { ActionsController } from './actions.controller';
import { ConnectorsController } from './connectors.controller';

@Module({
  imports: [SharedModule],
  controllers: [ActionsController, ConnectorsController],
})
export class ClientsApiModule {}

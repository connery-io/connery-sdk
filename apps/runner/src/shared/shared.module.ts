import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Connector } from './connector';
import { LocalConfigService } from './local-config.service';
import { RequestService } from './request.service';
import { Action } from './action';
import { ConnectorsService } from './connectors.service';

@Module({
  imports: [ConfigModule],
  providers: [
    LocalConfigService,
    RequestService,
    ConnectorsService,
    {
      provide: 'CURRENT_CONNECTOR',
      inject: [ConnectorsService, RequestService],
      useFactory: async (connectorsService: ConnectorsService, requestService: RequestService): Promise<Connector> => {
        const connector = await connectorsService.getConnector(
          requestService.repoOwner,
          requestService.repoName,
          requestService.repoBranch,
        );
        return connector;
      },
    },
    {
      provide: 'CURRENT_ACTION',
      inject: ['CURRENT_CONNECTOR', RequestService],
      useFactory: (connector: Connector, requestService: RequestService): Action => {
        const action = connector.getAction(requestService.actionKey);
        return action;
      },
    },
  ],
  exports: [ConnectorsService, RequestService, LocalConfigService, 'CURRENT_CONNECTOR', 'CURRENT_ACTION'],
})
export class SharedModule {}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ActionOutput,
  ConnectorOutput,
  ObjectResponse,
  PaginatedResponse,
  RunActionInput,
  RunActionOutput,
} from './types';
import { ConnectorsService } from ':src/shared/connectors.service';
import * as _ from 'lodash';
import { Action } from ':src/shared/action';

@Controller('/v1/connectors')
export class ConnectorsController {
  constructor(private connectorsService: ConnectorsService) {}

  @Get('/')
  async getConnectors(): Promise<PaginatedResponse<ConnectorOutput[]>> {
    try {
      const connectors = await this.connectorsService.getConnectors();

      return {
        status: 'success',
        data: _.map(connectors, (connector) => {
          return {
            key: connector.key,
            title: connector.schema.title,
            description: connector.schema.description,
            actions: _.map(connector.getActions(), (action: Action) => {
              return {
                key: action.key,
                title: action.schema.title,
                description: action.schema.description,
                type: action.schema.type,
                inputParameters: action.schema.inputParameters,
                outputParameters: action.schema.outputParameters,
              } as ActionOutput;
            }),
          } as ConnectorOutput;
        }),
      };
    } catch (error) {
      return {
        status: 'error',
        error: {
          message: error.message,
        },
      };
    }
  }

  @Get('/:connectorKeyPart1/:connectorKeyPart2')
  async getConnector(
    @Param('connectorKeyPart1') connectorKeyPart1: string,
    @Param('connectorKeyPart2') connectorKeyPart2: string,
  ): Promise<ObjectResponse<ConnectorOutput>> {
    try {
      const connector = await this.connectorsService.getConnector(`${connectorKeyPart1}/${connectorKeyPart2}`);

      return {
        status: 'success',
        data: {
          key: connector.key,
          title: connector.schema.title,
          description: connector.schema.description,
          actions: _.map(connector.getActions(), (action: Action) => {
            return {
              key: action.key,
              title: action.schema.title,
              description: action.schema.description,
              type: action.schema.type,
              inputParameters: action.schema.inputParameters,
              outputParameters: action.schema.outputParameters,
            } as ActionOutput;
          }),
        },
      };
    } catch (error) {
      return {
        status: 'error',
        error: {
          message: error.message,
        },
      };
    }
  }

  @Get('/:connectorKeyPart1/:connectorKeyPart2/actions/:actionKey')
  async getAction(
    @Param('connectorKeyPart1') connectorKeyPart1: string,
    @Param('connectorKeyPart2') connectorKeyPart2: string,
    @Param('actionKey') actionKey: string,
  ): Promise<ObjectResponse<ActionOutput>> {
    try {
      const connector = await this.connectorsService.getConnector(`${connectorKeyPart1}/${connectorKeyPart2}`);
      const action = connector.getAction(actionKey);

      return {
        status: 'success',
        data: {
          key: action.key,
          title: action.schema.title,
          description: action.schema.description,
          type: action.schema.type,
          inputParameters: action.schema.inputParameters,
          outputParameters: action.schema.outputParameters,
        },
      };
    } catch (error) {
      return {
        status: 'error',
        error: {
          message: error.message,
        },
      };
    }
  }

  @Post('/:connectorKeyPart1/:connectorKeyPart2/actions/:actionKey/run')
  async runAction(
    @Param('connectorKeyPart1') connectorKeyPart1: string,
    @Param('connectorKeyPart2') connectorKeyPart2: string,
    @Param('actionKey') actionKey: string,
    @Body() body: RunActionInput,
  ): Promise<ObjectResponse<RunActionOutput>> {
    throw new Error('Not implemented');
  }
}

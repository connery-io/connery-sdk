import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import { map } from 'lodash';
import { IPluginCache } from ':src/shared/plugin-cache/plugin-cache.interface';
import { ObjectResponse, PaginatedResponse } from ':src/shared/types';
import { ActionDefinition, InputParametersObject } from '@connery-io/sdk';
import { ActionOutput } from 'lib';

type PluginListResponseType = {
  key: string;
  title: string;
  description?: string;
};

type PluginResponseType = PluginListResponseType & {
  actions: ActionResponseType[];
};

type ActionResponseType = Omit<ActionDefinition, 'operation'>;

@Controller('/v1/plugins')
export class PluginsController {
  constructor(@Inject(IPluginCache) private pluginCache: IPluginCache) {}

  @Get('/')
  async getPlugins(): Promise<PaginatedResponse<PluginListResponseType>> {
    try {
      const plugins = await this.pluginCache.getPlugins();

      return {
        status: 'success',
        data: map(plugins, (plugin) => {
          return {
            key: plugin.key,
            title: plugin.definition.title,
            description: plugin.definition.description,
          };
        }),
      };
    } catch (error: any) {
      // TODO: Replace with proper solution
      throw new HttpException(
        {
          status: 'error',
          error: {
            message: error.message,
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // We need to use two params here because the plugin contains a slash
  // (e.g. "connery-io/connery-runner-administration@main")
  @Get('/:connectorKeyPart1/:connectorKeyPart2')
  async getPlugin(
    @Param('connectorKeyPart1') connectorKeyPart1: string,
    @Param('connectorKeyPart2') connectorKeyPart2: string,
  ): Promise<ObjectResponse<PluginResponseType>> {
    try {
      const plugin = await this.pluginCache.getPlugin(`${connectorKeyPart1}/${connectorKeyPart2}`);

      return {
        status: 'success',
        data: {
          key: plugin.key,
          title: plugin.definition.title,
          description: plugin.definition.description,
          actions: map(plugin.definition.actions, convertAction),
        },
      };
    } catch (error: any) {
      // TODO: Replace with proper solution
      throw new HttpException(
        {
          status: 'error',
          error: {
            message: error.message,
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // We need to use two params here because the plugin contains a slash
  // (e.g. "connery-io/connery-runner-administration@main")
  @Get('/:connectorKeyPart1/:connectorKeyPart2/actions/:actionKey')
  async getAction(
    @Param('connectorKeyPart1') connectorKeyPart1: string,
    @Param('connectorKeyPart2') connectorKeyPart2: string,
    @Param('actionKey') actionKey: string,
  ): Promise<ObjectResponse<ActionResponseType>> {
    try {
      const connector = await this.pluginCache.getPlugin(`${connectorKeyPart1}/${connectorKeyPart2}`);
      const action = connector.getAction(actionKey);

      return {
        status: 'success',
        data: convertAction(action.definition),
      };
    } catch (error: any) {
      // TODO: Replace with proper solution
      throw new HttpException(
        {
          status: 'error',
          error: {
            message: error.message,
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // We need to use two params here because the plugin contains a slash
  // (e.g. "connery-io/connery-runner-administration@main")
  @Post('/:connectorKeyPart1/:connectorKeyPart2/actions/:actionKey/run')
  async runAction(
    @Param('connectorKeyPart1') connectorKeyPart1: string,
    @Param('connectorKeyPart2') connectorKeyPart2: string,
    @Param('actionKey') actionKey: string,
    @Body() body: InputParametersObject,
  ): Promise<ObjectResponse<ActionOutput>> {
    try {
      const plugin = await this.pluginCache.getPlugin(`${connectorKeyPart1}/${connectorKeyPart2}`);
      const action = plugin.getAction(actionKey);
      const actionResult = await action.run(body);

      return {
        status: 'success',
        data: actionResult,
      };
    } catch (error: any) {
      // TODO: Replace with proper solution
      throw new HttpException(
        {
          status: 'error',
          error: {
            message: error.message,
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

function convertAction(action: ActionDefinition): ActionResponseType {
  return {
    key: action.key,
    title: action.title,
    description: action.description,
    type: action.type,
    inputParameters: map(action.inputParameters, (inputParameter) => {
      return {
        key: inputParameter.key,
        title: inputParameter.title,
        description: inputParameter.description,
        type: inputParameter.type,
        validation: {
          required: inputParameter.validation?.required,
        },
      };
    }),
    outputParameters: map(action.outputParameters, (outputParameter) => {
      return {
        key: outputParameter.key,
        title: outputParameter.title,
        description: outputParameter.description,
        type: outputParameter.type,
        validation: {
          required: outputParameter.validation?.required,
        },
      };
    }),
  };
}

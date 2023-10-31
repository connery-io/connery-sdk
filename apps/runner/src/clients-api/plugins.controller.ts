import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { map } from 'lodash';
import { IPluginCache } from ':src/shared/plugin-cache/plugin-cache.interface';
import { ObjectResponse, PaginatedResponse } from ':src/shared/types';
import { InputParametersObject } from '@connery-io/sdk';
import { ActionOutput } from 'lib';

// TODO: Replace with the PluginDefinition type?
export type InputParameterType = {
  key: string;
  title: string;
  description?: string;
  type: string;
  validation?: {
    required?: boolean;
  };
};

// TODO: Replace with the PluginDefinition type?
export type OutputParameterType = {
  key: string;
  title: string;
  description?: string;
  type: string;
  validation?: {
    required?: boolean;
  };
};

// TODO: Replace with the PluginDefinition type?
export type ActionOutputType = {
  key: string;
  title: string;
  description?: string;
  type: string;
  inputParameters: InputParameterType[];
  outputParameters: OutputParameterType[];
};

// TODO: Replace with the PluginDefinition type?
export type PluginOutputType = {
  key: string;
  title: string;
  description?: string;
  actions: ActionOutputType[];
};

@Controller('/plugins')
export class PluginsController {
  constructor(private pluginCache: IPluginCache) {}

  @Get('/')
  async getPlugins(): Promise<PaginatedResponse<PluginOutputType[]>> {
    try {
      const plugins = await this.pluginCache.getPlugins();

      return {
        status: 'success',
        data: map(plugins, (plugin) => {
          return {
            key: plugin.key,
            title: plugin.definition.Title,
            description: plugin.definition.Description,
            actions: map(plugin.actions, (action) => {
              return {
                key: action.definition.Key,
                title: action.definition.Title,
                description: action.definition.Description,
                type: action.definition.Type,
                inputParameters: map(action.definition.InputParameters, (inputParameter) => {
                  return {
                    key: inputParameter.Key,
                    title: inputParameter.Title,
                    description: inputParameter.Description,
                    type: inputParameter.Type,
                    validation: {
                      required: inputParameter.Validation?.Required,
                    },
                  };
                }),
                outputParameters: map(action.definition.OutputParameters, (outputParameter) => {
                  return {
                    key: outputParameter.Key,
                    title: outputParameter.Title,
                    description: outputParameter.Description,
                    type: outputParameter.Type,
                    validation: {
                      required: outputParameter.Validation?.Required,
                    },
                  };
                }),
              };
            }),
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
  async getConnector(
    @Param('connectorKeyPart1') connectorKeyPart1: string,
    @Param('connectorKeyPart2') connectorKeyPart2: string,
  ): Promise<ObjectResponse<PluginOutputType>> {
    try {
      const plugin = await this.pluginCache.getPlugin(`${connectorKeyPart1}/${connectorKeyPart2}`);

      return {
        status: 'success',
        data: {
          key: plugin.key,
          title: plugin.definition.Title,
          description: plugin.definition.Description,
          actions: map(plugin.actions, (action) => {
            return {
              key: action.definition.Key,
              title: action.definition.Title,
              description: action.definition.Description,
              type: action.definition.Type,
              inputParameters: map(action.definition.InputParameters, (inputParameter) => {
                return {
                  key: inputParameter.Key,
                  title: inputParameter.Title,
                  description: inputParameter.Description,
                  type: inputParameter.Type,
                  validation: {
                    required: inputParameter.Validation?.Required,
                  },
                };
              }),
              outputParameters: map(action.definition.OutputParameters, (outputParameter) => {
                return {
                  key: outputParameter.Key,
                  title: outputParameter.Title,
                  description: outputParameter.Description,
                  type: outputParameter.Type,
                  validation: {
                    required: outputParameter.Validation?.Required,
                  },
                };
              }),
            };
          }),
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
  ): Promise<ObjectResponse<ActionOutputType>> {
    try {
      const connector = await this.pluginCache.getPlugin(`${connectorKeyPart1}/${connectorKeyPart2}`);
      const action = connector.getAction(actionKey);

      return {
        status: 'success',
        data: {
          key: action.definition.Key,
          title: action.definition.Title,
          description: action.definition.Description,
          type: action.definition.Type,
          inputParameters: map(action.definition.InputParameters, (inputParameter) => {
            return {
              key: inputParameter.Key,
              title: inputParameter.Title,
              description: inputParameter.Description,
              type: inputParameter.Type,
              validation: {
                required: inputParameter.Validation?.Required,
              },
            };
          }),
          outputParameters: map(action.definition.OutputParameters, (outputParameter) => {
            return {
              key: outputParameter.Key,
              title: outputParameter.Title,
              description: outputParameter.Description,
              type: outputParameter.Type,
              validation: {
                required: outputParameter.Validation?.Required,
              },
            };
          }),
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

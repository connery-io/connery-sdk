import { RunActionResponse } from '../api/dto.js';
import { ConfigurationParametersObject, InputParametersObject } from './context.js';
import {
  ConfigurationParameterDefinition,
  InputParameterDefinition,
  MaintainerDefinition,
  OperationDefinition,
  OutputParameterDefinition,
} from './definition.js';

export interface PluginRuntime {
  title: string;
  description?: string;
  actions: ActionRuntime[];
  configurationParameters: ConfigurationParameterDefinition[];
  maintainers: MaintainerDefinition[];

  findActionByKey(key: string): ActionRuntime | undefined;
}

export interface ActionRuntime {
  key: string;
  title: string;
  description?: string;
  type: 'create' | 'read' | 'update' | 'delete';
  inputParameters: InputParameterDefinition[];
  outputParameters: OutputParameterDefinition[];
  operation: OperationDefinition;
  plugin: PluginRuntime;

  run(
    input: InputParametersObject,
    defaultConfiguration: ConfigurationParametersObject | undefined,
    customConfiguration: ConfigurationParametersObject | undefined,
  ): Promise<RunActionResponse>;
}

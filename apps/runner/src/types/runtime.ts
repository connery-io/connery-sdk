import { RunActionResponse } from './api';
import { ConfigurationParametersObject, InputParametersObject } from './context';
import {
  ConfigurationParameterDefinition,
  InputParameterDefinition,
  MaintainerDefinition,
  OperationDefinition,
  OutputParameterDefinition,
} from './definition';

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

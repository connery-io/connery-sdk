import { RunActionResponse } from '../api/dto.js';
import { InputObject } from './context.js';
import { InputParameterDefinition, OperationDefinition, OutputParameterDefinition } from './definition.js';

export interface PluginRuntime {
  name: string;
  description?: string;
  actions: ActionRuntime[];

  findActionByKey(key: string): ActionRuntime | undefined;
}

export interface ActionRuntime {
  key: string;
  name: string;
  description?: string;
  type: 'create' | 'read' | 'update' | 'delete';
  inputParameters: InputParameterDefinition[];
  outputParameters: OutputParameterDefinition[];
  operation: OperationDefinition;
  plugin: PluginRuntime;

  run(input: InputObject): Promise<RunActionResponse>;
}

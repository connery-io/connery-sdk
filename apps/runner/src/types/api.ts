import {
  ConfigurationParameterDefinition,
  InputParameterDefinition,
  MaintainerDefinition,
  OutputParameterDefinition,
} from './definition.js';
import { ConfigurationParametersObject, InputParametersObject, OutputParametersObject } from './context.js';
import { ActionRuntime, PluginRuntime } from './runtime.js';

//
// Generic response types
//

export interface PaginatedResponse<T> {
  status: 'success';
  data: T[];
}

export interface ObjectResponse<T> {
  status: 'success';
  data: T;
}

export interface ErrorResponse {
  status: 'error';
  error: {
    message: string;
  };
}

//
// Response types
//

export interface PluginResponse {
  title: string;
  description?: string;
  configurationParameters: ConfigurationParameterDefinition[];
  maintainers: MaintainerDefinition[];
}

export interface ActionResponse {
  key: string;
  title: string;
  description?: string;
  type: 'create' | 'read' | 'update' | 'delete';
  inputParameters: InputParameterDefinition[];
  outputParameters: OutputParameterDefinition[];
}

export function convertPluginRuntimeToPluginResponse(pluginRuntime: PluginRuntime): PluginResponse {
  return {
    title: pluginRuntime.title,
    description: pluginRuntime.description,
    configurationParameters: pluginRuntime.configurationParameters,
    maintainers: pluginRuntime.maintainers,
  };
}

export function convertActionRuntimeToActionResponse(actionRuntime: ActionRuntime): ActionResponse {
  return {
    key: actionRuntime.key,
    title: actionRuntime.title,
    description: actionRuntime.description,
    type: actionRuntime.type,
    inputParameters: actionRuntime.inputParameters,
    outputParameters: actionRuntime.outputParameters,
  };
}

export interface RunActionResponse {
  output: OutputParametersObject;
}

//
// Request types
//

export interface RunActionRequest {
  input: InputParametersObject;
  configuration: ConfigurationParametersObject | undefined;
}

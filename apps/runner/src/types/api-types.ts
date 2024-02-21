import { ActionRuntime } from ':src/lib/action-runtime';
import { PluginRuntime } from ':src/lib/plugin-runtime';
import { ActionDefinition } from ':src/types/definition';
import { InputParametersObject } from './context';

//
// API generic response types
//

export type PaginatedResponse<T> = {
  status: 'success';
  data: T[];
};

export type ObjectResponse<T> = {
  status: 'success';
  data: T;
};

export type ErrorResponse = {
  status: 'error';
  error: {
    message: string;
  };
};

//
// API response types
//

export type PluginListResponseType = {
  id: string;
  key: string;
  title: string;
  description?: string;
};

export type PluginResponseType = PluginListResponseType & {
  actions: ActionResponseType[];
};

export type ActionResponseType = Omit<ActionDefinition, 'operation'> & {
  id: string;
  pluginId: string;
};

//
// API response type converters
//

// Convert an array of PluginRuntime to an array of PluginListResponseType
export function convertPluginForList(plugin: PluginRuntime): PluginListResponseType {
  return {
    id: plugin.id,
    key: plugin.key,
    title: plugin.definition.title,
    description: plugin.definition.description,
  };
}

// Convert an PluginRuntime to an PluginResponseType
export function convertPlugin(plugin: PluginRuntime): PluginResponseType {
  return {
    id: plugin.id,
    key: plugin.key,
    title: plugin.definition.title,
    description: plugin.definition.description,
    actions: plugin.actions.map(convertAction),
  };
}

// Convert an ActionRuntime to an ActionResponseType
export function convertAction(action: ActionRuntime): ActionResponseType {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { operation, ...rest } = action.definition;
  return {
    id: action.id,
    ...rest,
    pluginId: action.plugin.id,
  };
}

//
// API request types
//

export type IdentifyActionRequest = {
  prompt: string;
};

export type RunActionRequest = {
  prompt?: string;
  input?: InputParametersObject;
};

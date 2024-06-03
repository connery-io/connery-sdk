import { ActionContext, OutputObject } from './context.js';

export interface PluginDefinition {
  name: string;
  description?: string;
  actions: ActionDefinition[];
}

export interface ActionDefinition {
  key: string;
  name: string;
  description?: string;
  type: 'create' | 'read' | 'update' | 'delete';
  inputParameters: InputParameterDefinition[];
  outputParameters: OutputParameterDefinition[];
  operation: OperationDefinition;
}

export interface InputParameterDefinition {
  key: string;
  name: string;
  description?: string;
  type: 'string';
  validation?: ValidationDefinition;
}

export interface OutputParameterDefinition {
  key: string;
  name: string;
  description?: string;
  type: 'string';
  validation?: ValidationDefinition;
}

export interface OperationDefinition {
  handler: (context: ActionContext) => Promise<OutputObject>;
}

export interface ValidationDefinition {
  required?: boolean;
}

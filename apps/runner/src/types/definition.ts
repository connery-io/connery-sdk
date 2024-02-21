import { Context } from './context';
import { ActionContext } from './context';
import { OutputParametersObject } from './context';

export type PluginDefinition = {
  title: string;
  description?: string;
  actions: ActionDefinition[] | ((context: Context) => Promise<ActionDefinition[]>);
  configurationParameters: ConfigurationParameterDefinition[];
  maintainers: MaintainerDefinition[];
  connery: ConneryDefinition;
};

export type ActionDefinition = {
  key: string;
  title: string;
  description?: string;
  type: 'create' | 'read' | 'update' | 'delete';
  inputParameters: InputParameterDefinition[];
  outputParameters: OutputParameterDefinition[];
  operation: OperationDefinition;
};

export type InputParameterDefinition = {
  key: string;
  title: string;
  description?: string;
  type: 'string';
  validation?: ValidationDefinition;
};

export type OutputParameterDefinition = {
  key: string;
  title: string;
  description?: string;
  type: 'string';
  validation?: ValidationDefinition;
};

export type OperationDefinition = {
  handler: (context: ActionContext) => Promise<OutputParametersObject>;
};

export type ConfigurationParameterDefinition = {
  key: string;
  title: string;
  description?: string;
  type: 'string';
  validation?: ValidationDefinition;
};

export type MaintainerDefinition = {
  name: string;
  email: string;
};

export type ConneryDefinition = {
  runnerVersion: '0';
};

export type ValidationDefinition = {
  required?: boolean;
};

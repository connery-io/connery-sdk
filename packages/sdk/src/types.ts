//
// Definition types
//

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

//
// Context types
//

// At the moment we only support string parameters.
// In the future we may support other types, such as boolean, number, etc.
// That's why we have a separate type for parameter values.
export type InputParameterValue = string;
export type OutputParameterValue = string;
export type ConfigurationParameterValue = string;

export type InputParametersObject = {
  [key: string]: InputParameterValue;
};

export type OutputParametersObject = {
  [key: string]: OutputParameterValue;
};

export type ConfigurationParametersObject = {
  [key: string]: ConfigurationParameterValue;
};

export type Context = {
  configurationParameters: ConfigurationParametersObject;
};

export type ActionContext = Context & {
  inputParameters: InputParametersObject;
};

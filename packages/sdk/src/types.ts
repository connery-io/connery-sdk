//
// Definition types
//

export type PluginDefinition = {
  Title: string;
  Description?: string;
  Actions: ActionDefinition[] | ((context: Context) => Promise<ActionDefinition[]>);
  ConfigurationParameters: ConfigurationParameterDefinition[];
  Maintainers: MaintainerDefinition[];
  Connery: ConneryDefinition;
};

export type ActionDefinition = {
  Key: string;
  Title: string;
  Description?: string;
  Type: 'create' | 'read' | 'update' | 'delete';
  InputParameters: InputParameterDefinition[];
  OutputParameters: OutputParameterDefinition[];
  Operation: OperationDefinition;
};

export type InputParameterDefinition = {
  Key: string;
  Title: string;
  Description?: string;
  Type: 'string';
  Validation?: ValidationDefinition;
};

export type OutputParameterDefinition = {
  Key: string;
  Title: string;
  Description?: string;
  Type: 'string';
  Validation?: ValidationDefinition;
};

export type OperationDefinition = {
  Handler: (context: ActionContext) => Promise<OutputParametersObject>;
};

export type ConfigurationParameterDefinition = {
  Key: string;
  Title: string;
  Description?: string;
  Type: 'string';
  Validation?: ValidationDefinition;
};

export type MaintainerDefinition = {
  Name: string;
  Email: string;
};

export type ConneryDefinition = {
  RunnerVersion: '0';
};

export type ValidationDefinition = {
  Required?: boolean;
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
  ConfigurationParameters: ConfigurationParametersObject;
};

export type ActionContext = Context & {
  InputParameters: InputParametersObject;
};

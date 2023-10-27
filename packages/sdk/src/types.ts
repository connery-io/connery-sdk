//
// Definition types
//

export type Plugin = {
  Title: string;
  Description?: string;
  Actions: Action[] | (() => Promise<Action[]>);
  ConfigurationParameters: ConfigurationParameter[];
  Maintainers: Maintainer[];
  Connery: Connery;
};

export type Action = {
  Key: string;
  Title: string;
  Description?: string;
  Type: 'create' | 'read' | 'update' | 'delete';
  InputParameters: InputParameter[] | (() => Promise<InputParameter[]>);
  OutputParameters: OutputParameter[] | (() => Promise<OutputParameter[]>);
  Operation: Operation;
};

export type InputParameter = {
  Key: string;
  Title: string;
  Description?: string;
  Type: 'string';
  Validation?: Validation;
};

export type OutputParameter = {
  Key: string;
  Title: string;
  Description?: string;
  Type: 'string';
  Validation?: Validation;
};

export type Operation = {
  Handler: (context: ActionContext) => Promise<OutputParametersObject>;
};

export type ConfigurationParameter = {
  Key: string;
  Title: string;
  Description?: string;
  Type: 'string';
  Validation?: Validation;
};

export type Maintainer = {
  Name: string;
  Email: string;
};

export type Connery = {
  RunnerVersion: '0';
};

export type Validation = {
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

export type PluginFactoryContext = {
  ConfigurationParameters: ConfigurationParametersObject;
};

export type ActionContext = {
  InputParameters: InputParametersObject;
  ConfigurationParameters: ConfigurationParametersObject;
};

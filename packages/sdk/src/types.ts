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
// Runtime types
//

export type PluginRuntime = Omit<Plugin, 'Actions' | 'ConfigurationParameters'> & {
  // Plugin Key is a combination of the GitHub organization and repository name where the plugin is hosted (e.g. "connery-io/connery-plugin-template").
  // The plugin key is not specified in the plugin manifest to avoid duplication.
  // Instead, the plugin key is calculated from the GitHub repository URL on runtime.
  Key: string;
  Actions: ActionRuntime[] | (() => Promise<ActionRuntime[]>);
  ConfigurationParameters: ConfigurationParameterRuntime[];
  GetAction: (key: string) => Promise<ActionRuntime | undefined>;
  GetConfigurationParameter: (key: string) => Promise<ConfigurationParameterRuntime | undefined>;
};

export type ActionRuntime = Omit<Action, 'InputParameters' | 'OutputParameters'> & {
  InputParameters: InputParameterRuntime[] | (() => Promise<InputParameterRuntime[]>);
  OutputParameters: OutputParameterRuntime[] | (() => Promise<OutputParameterRuntime[]>);
  GetInputParameter: (key: string) => Promise<InputParameterRuntime | undefined>;
  GetOutputParameter: (key: string) => Promise<OutputParameterRuntime | undefined>;
};

export type InputParameterRuntime = InputParameter & {
  Value: InputParameterValue;
};

export type OutputParameterRuntime = OutputParameter & {
  Value: OutputParameterValue;
};

export type ConfigurationParameterRuntime = ConfigurationParameter & {
  Value: ConfigurationParameterValue;
};

// At the moment we only support string parameters.
// In the future we may support other types, such as boolean, number, etc.
// That's why we have a separate type for parameter values.
export type InputParameterValue = string;

// At the moment we only support string parameters.
// In the future we may support other types, such as boolean, number, etc.
// That's why we have a separate type for parameter values.
export type OutputParameterValue = string;

// At the moment we only support string parameters.
// In the future we may support other types, such as boolean, number, etc.
// That's why we have a separate type for parameter values.
export type ConfigurationParameterValue = string;

//
// Context types
//

export type InputParametersObject = {
  [key: string]: InputParameterValue;
};

export type OutputParametersObject = {
  [key: string]: OutputParameterValue;
};

export type ConfigurationParametersObject = {
  [key: string]: ConfigurationParameterValue;
};

export type PluginContext = {
  ConfigurationParameters: ConfigurationParameterRuntime[];
};

export type ActionContext = {
  InputParameters: InputParametersObject;
  ConfigurationParameters: ConfigurationParametersObject;
  Action: ActionRuntime;
  Plugin: PluginRuntime;
};

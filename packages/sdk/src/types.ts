//
// Definition types
//

export type Validation = {
  Required?: boolean;
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

export type ConfigurationParameter = {
  Key: string;
  Title: string;
  Description?: string;
  Type: 'string';
  Validation?: Validation;
};

export type Operation = {
  Handler: (context: ActionContext) => Promise<OutputParametersObject>;
};

export type Action = {
  Key: string;
  Title: string;
  Description?: string;
  Type: 'create' | 'read' | 'update' | 'delete';
  InputParameters: InputParameter[] | (() => Promise<InputParameter[]>);
  Operation: Operation;
  OutputParameters: OutputParameter[] | (() => Promise<OutputParameter[]>);
};

export type Maintainer = {
  Name: string; // Person or organization name
  Email: string;
};

export type Connery = {
  RunnerVersion: '0';
};

export type Plugin = {
  Title: string;
  Description?: string;
  Actions: Action[] | (() => Promise<Action[]>);
  ConfigurationParameters: ConfigurationParameter[];
  Maintainers: Maintainer[];
  Connery: Connery;
};

//
// Extension types
//

type PluginRuntimeExtension = {
  // Plugin Key is a combination of the GitHub organization and repository name where the plugin is hosted (e.g. "connery-io/connery-plugin-template").
  // The plugin key is not specified in the plugin manifest to avoid duplication.
  // Instead, the plugin key is calculated from the GitHub repository URL on runtime.
  Key: string;
  GetAction: (key: string) => Promise<ActionRuntime | undefined>;
  GetConfigurationParameter: (key: string) => Promise<ConfigurationParameterRuntime | undefined>;
};

type ActionRuntimeExtension = {
  GetInputParameter: (key: string) => Promise<InputParameterRuntime | undefined>;
  GetOutputParameter: (key: string) => Promise<OutputParameterRuntime | undefined>;
};

type InputParameterRuntimeExtension = {
  // Parameter value is available only on runtime.
  Value: InputParameterValue;
};

type ConfigurationParameterRuntimeExtension = {
  // Parameter value is available only on runtime.
  Value: ConfigurationParameterValue;
};

//
// Runtime types
//

export type PluginRuntime = Plugin & PluginRuntimeExtension;

export type ActionRuntime = Action & ActionRuntimeExtension;

export type InputParameterRuntime = InputParameter & InputParameterRuntimeExtension;

export type ConfigurationParameterRuntime = ConfigurationParameter & ConfigurationParameterRuntimeExtension;

// We don't need to add value to OutputParameterRuntime because it's not available on runtime anyway.
// The value is only becomes available after the Action is executed.
// But for the sake of consistency we add it here. And we may need it in the future.
export type OutputParameterRuntime = OutputParameter;

export type PluginContext = {
  ConfigurationParameters: ConfigurationParameterRuntime[];
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

export type OutputParametersObject = {
  [key: string]: OutputParameterValue;
};

export type ActionContext = {
  InputParameters: InputParameterRuntime[];
  ConfigurationParameters: ConfigurationParameterRuntime[];
  Plugin: PluginRuntime;
  Action: ActionRuntime;
};

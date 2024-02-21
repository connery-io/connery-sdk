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

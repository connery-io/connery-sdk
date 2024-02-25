// At the moment we only support string parameters.
// In the future we may support other types, such as boolean, number, etc.
// That's why we have a separate type for parameter values.
export type InputParameterValue = string;
export type OutputParameterValue = string;
export type ConfigurationParameterValue = string;

export interface InputParametersObject {
  [key: string]: InputParameterValue;
}

export interface OutputParametersObject {
  [key: string]: OutputParameterValue;
}

export interface ConfigurationParametersObject {
  [key: string]: ConfigurationParameterValue;
}

export interface ActionContext {
  inputParameters: InputParametersObject;
  configurationParameters: ConfigurationParametersObject;
}

/*import {
  Action,
  ActionRuntime,
  ConfigurationParameter,
  ConfigurationParameterRuntime,
  ConfigurationParameterValue,
  InputParameter,
  InputParameterRuntime,
  InputParameterValue,
  OutputParameter,
  OutputParameterRuntime,
  Plugin,
  PluginRuntime,
} from '../../sdk/src/types';

//
// Plugin runtime helpers
//

async function getAction(key: string): Promise<ActionRuntime | undefined> {
  // If Actions is an array, find the Action with the specified key
  if (Array.isArray(this.Actions)) {
    return this.Actions.find((action: ActionRuntime) => action.Key === key);
  }

  // If Actions is a function returning a Promise, handle it
  if (typeof this.Actions === 'function') {
    const actions = await this.Actions();
    return actions.find((action: ActionRuntime) => action.Key === key);
  }

  return undefined;
}

async function getConfigurationParameter(key: string): Promise<ConfigurationParameterRuntime | undefined> {
  // If ConfigurationParameters is an array, find the ConfigurationParameter with the specified key
  if (Array.isArray(this.ConfigurationParameters)) {
    return this.ConfigurationParameters.find((parameter: ConfigurationParameterRuntime) => parameter.Key === key);
  }

  // If ConfigurationParameters is a function returning a Promise, handle it
  if (typeof this.ConfigurationParameters === 'function') {
    const parameters = await this.ConfigurationParameters();
    return parameters.find((parameter: ConfigurationParameterRuntime) => parameter.Key === key);
  }

  return undefined;
}

//
// Action runtime helpers
//

async function getInputParameter(key: string): Promise<InputParameterRuntime | undefined> {
  // If InputParameters is an array, find the InputParameter with the specified key
  if (Array.isArray(this.InputParameters)) {
    return this.InputParameters.find((parameter: InputParameterRuntime) => parameter.Key === key);
  }

  // If InputParameters is a function returning a Promise, handle it
  if (typeof this.InputParameters === 'function') {
    const parameters = await this.InputParameters();
    return parameters.find((parameter: InputParameterRuntime) => parameter.Key === key);
  }

  return undefined;
}

async function getOutputParameter(key: string): Promise<OutputParameterRuntime | undefined> {
  // If OutputParameters is an array, find the OutputParameter with the specified key
  if (Array.isArray(this.OutputParameters)) {
    return this.OutputParameters.find((parameter: OutputParameterRuntime) => parameter.Key === key);
  }

  // If OutputParameters is a function returning a Promise, handle it
  if (typeof this.OutputParameters === 'function') {
    const parameters = await this.OutputParameters();
    return parameters.find((parameter: OutputParameterRuntime) => parameter.Key === key);
  }

  return undefined;
}

//
// Extend functions
//

function extendPlugin(plugin: Plugin, key: string): PluginRuntime {
  return {
    Key: key,
    ...plugin,
    GetAction: getAction,
    GetConfigurationParameter: getConfigurationParameter,
  };
}

function extendAction(action: Action): ActionRuntime {
  return {
    ...action,
    GetInputParameter: getInputParameter,
    GetOutputParameter: getOutputParameter,
  };
}

function extendInputParameter(parameter: InputParameter, value: InputParameterValue): InputParameterRuntime {
  return {
    ...parameter,
    Value: value,
  };
}

function extendOutputParameter(parameter: OutputParameter): OutputParameterRuntime {
  // We don't need to add value to OutputParameterRuntime because it's not available on runtime anyway.
  // But for the sake of consistency we add it here. And we may need it in the future.
  return parameter as OutputParameterRuntime;
}

function extendConfigurationParameter(
  parameter: ConfigurationParameter,
  value: ConfigurationParameterValue,
): ConfigurationParameterRuntime {
  return {
    ...parameter,
    Value: value,
  };
}
*/

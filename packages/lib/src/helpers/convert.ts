import {
  Action,
  ActionRuntime,
  ConfigurationParameter,
  ConfigurationParameterRuntime,
  InputParameter,
  InputParameterRuntime,
  OutputParameter,
  OutputParameterRuntime,
  Plugin,
  PluginRuntime,
} from '@connery-io/sdk';

export async function convertPlugin(plugin: Plugin, key: string): Promise<PluginRuntime> {
  return {
    Key: key,
    ...plugin,
    Actions: await convertActions(plugin.Actions),
    ConfigurationParameters: convertConfigurationParameters(plugin.ConfigurationParameters),
  };
}

async function convertActions(actions: Action[] | (() => Promise<Action[]>)): Promise<ActionRuntime[]> {
  if (typeof actions === 'function') {
    actions = await actions();
  }

  const actionRuntimePromises = await actions.map(
    async (action: Action): Promise<ActionRuntime> => ({
      ...action,
      InputParameters: await convertInputParameters(action.InputParameters),
      OutputParameters: await convertOutputParameters(action.OutputParameters),
    }),
  );

  return Promise.all(actionRuntimePromises);
}

function convertConfigurationParameters(configParameters: ConfigurationParameter[]): ConfigurationParameterRuntime[] {
  return configParameters.map((configParam) => ({
    ...configParam,
    Value: '',
  }));
}

async function convertInputParameters(
  inputParameters: InputParameter[] | (() => Promise<InputParameter[]>),
): Promise<InputParameterRuntime[]> {
  if (typeof inputParameters === 'function') {
    inputParameters = await inputParameters();
  }

  return inputParameters.map((inputParam) => ({
    ...inputParam,
    Value: '',
  }));
}

async function convertOutputParameters(
  outputParameters: OutputParameter[] | (() => Promise<OutputParameter[]>),
): Promise<OutputParameterRuntime[]> {
  if (typeof outputParameters === 'function') {
    outputParameters = await outputParameters();
  }

  return outputParameters.map((outputParam) => ({
    ...outputParam,
    Value: '',
  }));
}

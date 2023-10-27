//
// Runtime types
//

import {
  Plugin,
  Action,
  ConfigurationParameter,
  ConfigurationParameterValue,
  InputParameter,
  InputParameterValue,
  OutputParameter,
  OutputParameterValue,
} from '@connery-io/sdk';

export type PluginRuntime = Omit<Plugin, 'Actions' | 'ConfigurationParameters'> & {
  // Plugin Key is a combination of the GitHub organization and repository name where the plugin is hosted (e.g. "connery-io/connery-plugin-template").
  // The plugin key is not specified in the plugin manifest to avoid duplication.
  // Instead, the plugin key is calculated from the GitHub repository URL on runtime.
  Key: string;
  Actions: ActionRuntime[];
  ConfigurationParameters: ConfigurationParameterRuntime[];
};

export type ActionRuntime = Omit<Action, 'InputParameters' | 'OutputParameters'> & {
  InputParameters: InputParameterRuntime[];
  OutputParameters: OutputParameterRuntime[];
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

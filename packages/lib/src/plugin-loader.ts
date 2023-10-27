import { ConfigurationParametersObject, PluginFactoryContext } from '@connery-io/sdk';
import { PluginRuntime } from './types';
import { convertPlugin } from './helpers/convert';
import { populateConfigurationParameters } from './helpers/populate';
import { getPluginFactory } from './helpers/read';
import { validatePluginRuntime } from './helpers/validate';

export class PluginLoader {
  private _pluginRuntime: PluginRuntime | null = null;

  constructor(
    private _pluginDefinitionPath: string,
    private _pluginKey: string,
    private _configurationParametersObject: ConfigurationParametersObject,
  ) {}

  async load(): Promise<void> {
    // Read plugin definition file and get plugin factory
    const pluginFactoryContext: PluginFactoryContext = { ConfigurationParameters: this._configurationParametersObject };
    const pluginFactory = await getPluginFactory(this._pluginDefinitionPath, pluginFactoryContext);

    // Get plugin definition
    const plugin = await pluginFactory.GetPlugin();

    // Convert plugin definition to runtime plugin object
    const pluginRuntime = await convertPlugin(plugin, this._pluginKey);

    // Validate plugin runtime object as we need to resolve all the aync functions to arrays of objects
    validatePluginRuntime(pluginRuntime);

    // Populate configuration parameters in the runtime plugin object
    pluginRuntime.ConfigurationParameters = populateConfigurationParameters(
      pluginRuntime.ConfigurationParameters,
      this._configurationParametersObject,
    );

    // Set properties
    this._pluginRuntime = pluginRuntime;
  }

  get pluginRuntime(): PluginRuntime {
    if (!this._pluginRuntime) {
      throw new Error('Plugin is not loaded');
    }

    return this._pluginRuntime;
  }
}

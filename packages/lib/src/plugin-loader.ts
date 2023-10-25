import { ConfigurationParametersObject, PluginContext, PluginRuntime } from '@connery-io/sdk';
import { convertPlugin } from './helpers/convert';
import { populateConfigurationParameters } from './helpers/populate';
import { readPluginDefinitionFile } from './helpers/read';
import { validatePluginRuntime } from './helpers/validate';

export class PluginLoader {
  private _pluginRuntime: PluginRuntime | null = null;

  constructor(
    private _pluginDefinitionPath: string,
    private _pluginKey: string,
    private _configurationParametersObject: ConfigurationParametersObject,
  ) {}

  async load(): Promise<void> {
    // Read plugin definition file
    const pluginInstance = await readPluginDefinitionFile(this._pluginDefinitionPath);

    // Get plugin definition
    const pluginContext: PluginContext = { ConfigurationParameters: this._configurationParametersObject };
    const plugin = await pluginInstance.GetPlugin(pluginContext);

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

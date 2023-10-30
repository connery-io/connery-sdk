import { ConfigurationParameterDefinition, ConfigurationParametersObject, PluginDefinition } from '@connery-io/sdk';
import { validatePluginDefinitionWithoutActions } from './plugin-definition-validation-utils';
import { PluginRuntime } from './plugin-runtime';

// This class is used to load a plugin from file to memory and provide the plugin runtime object.
export class PluginLoader {
  private _pluginDefinition: PluginDefinition | null = null;

  async init(pluginDefinitionPath: string): Promise<void> {
    // Read plugin definition
    const pluginDefinition = await this.getPluginDefinition(pluginDefinitionPath);

    // We do not resolve async functions in plugin definition here becasue we don't have the configuration parameters yet,
    // so we validate the plugin definition without resolving async functions.
    validatePluginDefinitionWithoutActions(pluginDefinition);

    // Save plugin definition to memory
    this._pluginDefinition = pluginDefinition;
  }

  get configurationParameterDefinitions(): ConfigurationParameterDefinition[] {
    if (!this._pluginDefinition) {
      throw new Error('Plugin loader is not initialized.');
    }

    return this._pluginDefinition.ConfigurationParameters;
  }

  // After loading the plugin, we can get the plugin runtime object.
  async getPlugin(pluginKey: string, configurationParameters: ConfigurationParametersObject): Promise<PluginRuntime> {
    if (!this._pluginDefinition) {
      throw new Error('Plugin loader is not initialized.');
    }

    const pluginRuntime = new PluginRuntime();
    await pluginRuntime.init(pluginKey, this._pluginDefinition, configurationParameters);

    return pluginRuntime;
  }

  private async getPluginDefinition(pluginDefinitionPath: string): Promise<PluginDefinition> {
    const importedModule = await import(pluginDefinitionPath);
    const plugin = importedModule.default.default as PluginDefinition;
    return plugin;
  }
}

import { import_ } from '@brillout/import';
import { ConfigurationParameterValue, PluginRuntime } from '../../sdk/src/types';

type ConfigurationParametersObject = {
  [key: string]: ConfigurationParameterValue;
};

export class PluginLoader {
  constructor(
    private _pluginDefinitionPath: string,
    private _configurationParametersObject: ConfigurationParametersObject,
  ) {}

  async load(): Promise<PluginRuntime> {
    const plugin = await this.readPluginDefinitionFileUsingImport();
    return plugin;
  }

  private async readPluginDefinitionFileUsingImport() {
    // TODO: Use timestamp as cache buster to clear import cache
    const connector = await import_(this._pluginDefinitionPath);
    return connector.default;
  }
}

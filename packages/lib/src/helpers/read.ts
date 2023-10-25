import import_ from '@brillout/import';
import { IPlugin } from '@connery-io/sdk';

export async function readPluginDefinitionFile(pluginDefinitionPath: string): Promise<IPlugin> {
  const importedModule = await import_(pluginDefinitionPath);
  const PluginClass = importedModule.default;
  const pluginInstance: IPlugin = new PluginClass();
  return pluginInstance;
}

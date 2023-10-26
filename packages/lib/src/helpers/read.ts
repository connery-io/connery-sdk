import { AbstractPluginFactory, PluginFactoryContext } from '@connery-io/sdk';

export async function getPluginFactory(
  pluginDefinitionPath: string,
  pluginFactoryContext: PluginFactoryContext,
): Promise<AbstractPluginFactory> {
  const importedModule = await import(pluginDefinitionPath);
  const pluginFactoryClass = importedModule.default.default as {
    new (context: PluginFactoryContext): AbstractPluginFactory;
  };
  const pluginFactoryInstance = new pluginFactoryClass(pluginFactoryContext);
  return pluginFactoryInstance;
}

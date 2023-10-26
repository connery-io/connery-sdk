import { Plugin, PluginFactoryContext } from './types';

export abstract class AbstractPluginFactory {
  constructor(protected pluginFactoryContext: PluginFactoryContext) {}

  abstract GetPlugin(): Promise<Plugin>;
}

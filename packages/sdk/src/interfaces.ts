import { Plugin, PluginContext } from './types';

export interface IPluginFactory {
  GetPlugin(context: PluginContext): Promise<Plugin>;
}

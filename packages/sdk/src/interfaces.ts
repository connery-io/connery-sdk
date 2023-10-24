import { Plugin, PluginContext } from './types';

export interface IPlugin {
  GetPlugin(context: PluginContext): Promise<Plugin>;
}

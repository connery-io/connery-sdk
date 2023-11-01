import { ActionRuntime, PluginRuntime } from 'lib';

export interface IPluginCache {
  getPlugins(): Promise<PluginRuntime[]>;
  getPlugin(pluginKey: string): Promise<PluginRuntime>;

  getActions(): Promise<ActionRuntime[]>; // Get actions across all plugins on the runner
  getAction(actionKey: string): Promise<ActionRuntime>; // Get action by key across all plugins on the runner

  initialize(): Promise<void>;
  clear(): Promise<void>;
}

// Used as a dependency injection token in NestJS
export const IPluginCache = Symbol('IPluginCache');

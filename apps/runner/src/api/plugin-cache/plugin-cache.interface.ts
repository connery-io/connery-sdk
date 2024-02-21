import { ActionRuntime } from ':src/lib/action-runtime';
import { PluginRuntime } from ':src/lib/plugin-runtime';

export interface IPluginCache {
  getPlugins(): Promise<PluginRuntime[]>;
  getPlugin(pluginId: string): Promise<PluginRuntime>;

  getActions(): Promise<ActionRuntime[]>; // Get actions across all plugins on the runner
  getAction(actionId: string): Promise<ActionRuntime>; // Get action by id across all plugins on the runner

  initialize(): Promise<void>;
  clear(): Promise<void>;
}

// Used as a dependency injection token in NestJS
export const IPluginCache = Symbol('IPluginCache');

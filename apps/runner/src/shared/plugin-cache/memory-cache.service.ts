import { rmSync } from 'fs';
import { LocalConfigService } from '../config/local-config.service';
import { PluginDownloader } from './plugin-downloader';
import { Inject } from '@nestjs/common';
import { find, filter } from 'lodash';
import { IPluginCache } from './plugin-cache.interface';
import { ActionRuntime, PluginRuntime } from 'lib';

export class MemoryCacheService implements IPluginCache {
  private _plugins: PluginRuntime[] = [];
  private _actions: ActionRuntime[] = [];

  constructor(@Inject(LocalConfigService) private configService: LocalConfigService) {}

  //
  // Plugins
  //

  async getPlugins(): Promise<PluginRuntime[]> {
    if (this._plugins.length === 0) {
      await this.initialize();
    }

    return this._plugins;
  }

  async getPlugin(pluginKey: string): Promise<PluginRuntime> {
    if (this._plugins.length === 0) {
      await this.initialize();
    }

    const plugin = find(this._plugins, { key: pluginKey });

    if (!plugin) {
      throw new Error(`The plugin '${pluginKey}' is not found on the runner.`);
    }

    return plugin;
  }

  //
  // Actions
  //

  async getActions(): Promise<ActionRuntime[]> {
    if (this._actions.length === 0) {
      await this.initialize();
    }

    return this._actions;
  }

  async getAction(actionKey: string): Promise<ActionRuntime> {
    if (this._actions.length === 0) {
      await this.initialize();
    }

    const actions = filter(this._actions, { key: actionKey }) as ActionRuntime[];

    if (actions.length === 0) {
      throw new Error(`The action '${actionKey}' is not found on the runner.`);
    } else if (actions.length > 1) {
      // TODO: handle this case properly
      throw new Error(
        `The action '${actionKey}' is found on multiple plugins on the runner. This case is not supported yet.`,
      );
    } else {
      return actions[0];
    }
  }

  //
  // Cache management
  //

  async initialize(): Promise<void> {
    const installedPluginsConfig = this.configService.getInstalledPlugins();
    const runnerConfig = this.configService.getRunnerConfig();

    for (const installedPluginConfig of installedPluginsConfig) {
      const pluginDownloader = new PluginDownloader(installedPluginConfig, runnerConfig.GitHubPat);
      await pluginDownloader.init();

      const plugin = pluginDownloader.plugin;
      this._plugins.push(plugin);

      const actions = await plugin.actions;
      this._actions.push(...actions);
    }

    console.log(JSON.stringify({ type: 'system', message: 'All plugins initialized in cache.' }));
  }

  async clear(): Promise<void> {
    // Remove all plugin files from file system
    rmSync('plugins', { recursive: true, force: true });

    // Clear cache in memory
    this._plugins = [];
    this._actions = [];

    console.log(JSON.stringify({ type: 'system', message: 'All plugins removed from cache.' }));
  }
}

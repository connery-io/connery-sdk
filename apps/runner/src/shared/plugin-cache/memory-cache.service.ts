import { rmSync } from 'fs';
import { PluginDownloader } from './plugin-downloader';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IPluginCache } from './plugin-cache.interface';
import { ActionRuntime, PluginRuntime } from 'lib';
import { IConfig } from '../config/config.interface';

@Injectable()
export class MemoryCacheService implements IPluginCache {
  private _plugins: PluginRuntime[] = [];
  private _actions: ActionRuntime[] = [];

  constructor(@Inject(IConfig) private config: IConfig) {}

  //
  // Plugins
  //

  async getPlugins(): Promise<PluginRuntime[]> {
    if (this._plugins.length === 0) {
      await this.initialize();
    }

    return this._plugins;
  }

  async getPlugin(pluginId: string): Promise<PluginRuntime> {
    if (this._plugins.length === 0) {
      await this.initialize();
    }

    const plugin = this._plugins.find((action: PluginRuntime) => action.id === pluginId);

    if (!plugin) {
      throw new HttpException(`The plugin '${pluginId}' is not found on the runner.`, HttpStatus.NOT_FOUND);
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

  async getAction(actionId: string): Promise<ActionRuntime> {
    if (this._actions.length === 0) {
      await this.initialize();
    }

    const action = this._actions.find((action: ActionRuntime) => action.id === actionId);

    if (!action) {
      throw new HttpException(`The action '${actionId}' is not found on the runner.`, HttpStatus.NOT_FOUND);
    }

    return action;
  }

  //
  // Cache management
  //

  async initialize(): Promise<void> {
    const installedPluginsConfig = this.config.getInstalledPlugins();
    const runnerConfig = this.config.getRunnerConfig();

    for (const installedPluginConfig of installedPluginsConfig) {
      const pluginDownloader = new PluginDownloader(installedPluginConfig, runnerConfig.gitHubPat);
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

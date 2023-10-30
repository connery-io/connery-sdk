import { rmSync } from 'fs';
import { LocalConfigService } from './local-config.service';
import { PluginDownloaderService } from './plugin-downloader.service';
import { Inject } from '@nestjs/common';
import { Action } from './action';
import { find, filter } from 'lodash';

// TODO: Define and implement IPluginCache interface
export class PluginInMemoryCacheService {
  private _plugins: PluginDownloaderService[] = [];
  private _actions: Action[] = [];

  constructor(@Inject(LocalConfigService) private configService: LocalConfigService) {}

  //
  // Plugins
  //

  async getPlugins(): Promise<PluginDownloaderService[]> {
    if (this._plugins.length === 0) {
      await this.initialize();
    }

    return this._plugins;
  }

  async getPlugin(pluginKey: string): Promise<PluginDownloaderService> {
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

  // Get actions across all plugins on the runner
  async getActions(): Promise<Action[]> {
    if (this._actions.length === 0) {
      await this.initialize();
    }

    return this._actions;
  }

  // Get action by key across all plugins on the runner
  async getAction(actionKey: string): Promise<Action> {
    if (this._actions.length === 0) {
      await this.initialize();
    }

    const actions = filter(this._actions, { key: actionKey });

    if (actions.length === 0) {
      throw new Error(`The action '${actionKey}' is not found on the runner.`);
    } else if (actions.length > 1) {
      // TODO: handle this case properly
      throw new Error(
        `The action '${actionKey}' is found on multiple plugins on the runner. This is not supported yet.`,
      );
    } else {
      return actions[0];
    }
  }

  //
  // Cache management
  //

  async initialize(): Promise<void> {
    const installedPluginsConfig = this.configService.getInstalledConnectors();
    const runnerConfig = this.configService.getRunnerConfig();

    for (const installedPluginConfig of installedPluginsConfig) {
      const plugin = new PluginDownloaderService(installedPluginConfig, runnerConfig);
      await plugin.initialize();
      this._plugins.push(plugin);

      const actions = await plugin.getActions();
      this._actions.push(...actions);
    }

    console.log(JSON.stringify({ type: 'system', message: 'All plugins initialized in cache.' }));
  }

  clean(): void {
    rmSync('plugins', { recursive: true, force: true });
    this._plugins = [];
    this._actions = [];

    console.log(JSON.stringify({ type: 'system', message: 'All plugins removed from cache.' }));
  }
}

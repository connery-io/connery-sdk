import { simpleGit } from 'simple-git';
import { PluginFileNotFoundError, PluginLoader, PluginRuntime } from 'lib';
import { InstalledPluginConfig } from '../config/types';

export class PluginDownloader {
  private _repoOwner: string;
  private _repoName: string;
  private _repoBranch: string;

  private _plugin: PluginRuntime | undefined;

  constructor(private _installedPluginConfig: InstalledPluginConfig, private _gitHubPat: string) {
    const { repoOwner, repoName, repoBranch } = this.parsePluginKey(this._installedPluginConfig.key);
    this._repoOwner = repoOwner;
    this._repoName = repoName;
    this._repoBranch = repoBranch;
  }

  async init(): Promise<void> {
    if (this._plugin) {
      // If the plugin is already initialized, do nothing
      return;
    }

    const pluginLoader = new PluginLoader();

    try {
      // Try to initialize the plugin from the file system
      await pluginLoader.init(this.pluginDefinitionPath);
    } catch (error) {
      if (error instanceof PluginFileNotFoundError) {
        // If the plugin definition file is not found in the file system,
        // download it from GitHub and try to initialize again
        await this.downloadPluginFromGitHub();
        await pluginLoader.init(this.pluginDefinitionPath);
      } else {
        throw error;
      }
    }

    this._plugin = await pluginLoader.getPlugin(
      this._installedPluginConfig.key,
      this._installedPluginConfig.configurationParameters,
    );
  }

  get plugin(): PluginRuntime {
    if (!this._plugin) {
      throw new Error('Plugin downloader is not initialized.');
    }

    return this._plugin;
  }

  private async downloadPluginFromGitHub(): Promise<void> {
    const git = simpleGit();

    try {
      await git.clone(this.pluginRepositoryUrl, this.pluginFolderPath, ['--depth', '1', '--branch', this._repoBranch]);

      console.log(
        JSON.stringify({ type: 'system', message: `Plugin '${this._installedPluginConfig.key}' downloaded.` }),
      );
    } catch (error: any) {
      if (error.message.includes('already exists')) {
        // If the plugin is already exist in cache, log it and continue
        console.log(
          JSON.stringify({
            type: 'system',
            message: `Plugin '${this._installedPluginConfig.key}' is already exist in cache.`,
          }),
        );
      } else {
        throw error;
      }
    }
  }

  private get pluginRepositoryUrl(): string {
    // If PAT is not provided, only public repositories can be downloaded
    const credentials = this._gitHubPat ? `oauth2:${this._gitHubPat}@` : '';
    return `https://${credentials}github.com/${this._repoOwner}/${this._repoName}.git`;
  }

  private get pluginFolderPath(): string {
    return `plugins/${this._repoOwner}/${this._repoName}/${this._repoBranch}`;
  }

  private get pluginDefinitionPath(): string {
    return `${process.cwd()}/${this.pluginFolderPath}/dist/plugin.js`;
  }

  private parsePluginKey(key: string): { repoOwner: string; repoName: string; repoBranch: string } {
    const [repo, branch] = key.split('@');
    const [owner, name] = repo.split('/');
    return { repoOwner: owner, repoName: name, repoBranch: branch };
  }
}

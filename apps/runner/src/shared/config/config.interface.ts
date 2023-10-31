import { InstalledPluginConfig, RunnerConfig } from './types';

export interface IConfig {
  verifyAccess(apiKey: string): boolean;
  getInstalledPlugins(): InstalledPluginConfig[];
  getRunnerConfig(): RunnerConfig;
}

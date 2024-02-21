import { ConfigurationParametersObject } from ':src/sdk/types';

export type ApiKeyConfig = {
  title: string;
  apiKey: string;
};

export type InstalledPluginConfig = {
  key: string;
  configurationParameters: ConfigurationParametersObject;
};

export type RunnerConfig = {
  gitHubPat: string;
  openAiApiKey: string;
  publicUrl: string;
};

export type Config = {
  apiKeys: ApiKeyConfig[];
  installedPlugins: InstalledPluginConfig[];
  runnerConfig: RunnerConfig;
};

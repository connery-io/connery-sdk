import { ConfigurationParametersObject } from '@connery-io/sdk';

export type ApiKeyConfig = {
  Title: string;
  ApiKey: string;
};

export type InstalledPluginConfig = {
  Key: string;
  ConfigurationParameters: ConfigurationParametersObject;
};

export type RunnerConfig = {
  GitHubPat: string;
  OpenAiApiKey: string;
};

export type Config = {
  ApiKeys: ApiKeyConfig[];
  InstalledPlugins: InstalledPluginConfig[];
  RunnerConfig: RunnerConfig;
};

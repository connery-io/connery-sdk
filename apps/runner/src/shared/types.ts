import { ActionSchemaType, ConnectorSchemaType } from './connector.schema';

export type ConfigurationParametersObject = {
  [key: string]: string;
};

export type InputParametersObject = {
  [key: string]: string;
};

export type OperationContext = {
  connector: ConnectorSchemaType;
  action: ActionSchemaType;
  inputParameters: InputParametersObject;
  configurationParameters: ConfigurationParametersObject;
};

// Config types

export type ApiKeyConfigType = {
  Title: string;
  ApiKey: string;
};

export type InstalledConnectorConfigType = {
  RepoOwner: string;
  RepoName: string;
  RepoBranch: string;
  ConfigurationParameters: ConfigurationParametersObject;
};

export type RunnerConfigType = {
  GitHubPat: string;
  OpenAiApiKey: string;
};

export type ConfigType = {
  ApiKeys: ApiKeyConfigType[];
  InstalledConnectors: InstalledConnectorConfigType[];
  RunnerConfig: RunnerConfigType;
};

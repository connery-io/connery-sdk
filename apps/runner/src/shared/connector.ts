import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { simpleGit } from 'simple-git';
import { existsSync } from 'fs';
import { ConnectorSchemaType, parseAndValidateConnectorSchema } from 'connector-schema';
import { ConfigurationParametersObject, InstalledConnectorConfigType, RunnerConfigType } from './types';
import { Action } from './action';

@Injectable()
export class Connector {
  private _connectorSchema: ConnectorSchemaType;

  constructor(private installedConnectorConfig: InstalledConnectorConfigType, private runnerConfig: RunnerConfigType) {}

  async initialize() {
    if (!this.isConnectorDefinitionFileExist()) {
      await this.downloadConnector();
    }
    this._connectorSchema = this.parseAndValidateConnectorSchema();
  }

  get key(): string {
    return `${this.repoOwner}/${this.repoName}@${this.repoBranch}`;
  }

  get repoOwner(): string {
    return this.installedConnectorConfig.RepoOwner;
  }

  get repoName(): string {
    return this.installedConnectorConfig.RepoName;
  }

  get repoBranch(): string {
    return this.installedConnectorConfig.RepoBranch;
  }

  get configurationParameters(): ConfigurationParametersObject {
    return this.installedConnectorConfig.ConfigurationParameters;
  }

  get schema(): ConnectorSchemaType {
    return this._connectorSchema;
  }

  getAction(actionKey: string): Action {
    const actionSchema = this.schema.actions.find((a) => a.key === actionKey);

    if (!actionSchema) {
      throw new HttpException(
        `Action '${actionKey}' is not found in the '${this.key}' connector.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const action = new Action(actionSchema, this);
    return action;
  }

  getActions(): Action[] {
    return this.schema.actions.map((actionSchema) => new Action(actionSchema, this));
  }

  private async downloadConnector(): Promise<void> {
    const git = simpleGit();

    try {
      await git.clone(this.repositoryUrl, this.localFolderPath, [
        '--depth',
        '1',
        '--branch',
        this.installedConnectorConfig.RepoBranch,
      ]);

      console.log(JSON.stringify({ type: 'system', message: `Connector '${this.key}' downloaded` }));
    } catch (error) {
      // ignore error if the connector is already downloaded
      if (error.message.includes('already exists')) {
        console.log(JSON.stringify({ type: 'system', message: `Connector '${this.key}' is already exist in cache` }));
      } else {
        throw error;
      }
    }
  }

  private isConnectorDefinitionFileExist(): boolean {
    return existsSync(this.connectorDefinitionPath);
  }

  private parseAndValidateConnectorSchema(): ConnectorSchemaType {
    try {
      const connectorSchema = parseAndValidateConnectorSchema(this.fullConnectorDefinitionPath);
      return connectorSchema;
    } catch (error) {
      throw new HttpException(
        `Connector definition validation error: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private get repositoryUrl(): string {
    // if PAT is not provided, only public repositories are available
    const credentials = this.runnerConfig.GitHubPat ? `oauth2:${this.runnerConfig.GitHubPat}@` : '';
    return `https://${credentials}github.com/${this.installedConnectorConfig.RepoOwner}/${this.installedConnectorConfig.RepoName}.git`;
  }

  private get localFolderPath(): string {
    return `connectors/${this.installedConnectorConfig.RepoOwner}/${this.installedConnectorConfig.RepoName}/${this.installedConnectorConfig.RepoBranch}`;
  }

  private get fullConnectorDefinitionPath(): string {
    return `${process.cwd()}/${this.localFolderPath}/dist/connector.js`;
  }

  private get connectorDefinitionPath(): string {
    return `./${this.localFolderPath}/dist/connector.js`;
  }
}

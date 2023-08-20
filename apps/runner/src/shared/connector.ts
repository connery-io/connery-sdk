import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { simpleGit } from 'simple-git';
import { existsSync } from 'fs';
import { ConnectorSchemaType, parseAndValidateConnector, readConnectorDefinitionFileUsingRequire } from 'lib';
import { ConfigurationParametersObject, InstalledConnectorConfigType, RunnerConfigType } from './types';
import { Action } from './action';

@Injectable()
export class Connector {
  private _connectorSchema: ConnectorSchemaType;
  private _repoOwner: string;
  private _repoName: string;
  private _repoBranch: string;

  constructor(private installedConnectorConfig: InstalledConnectorConfigType, private runnerConfig: RunnerConfigType) {
    const { repoOwner, repoName, repoBranch } = this.parseConnectorKey(this.installedConnectorConfig.Key);
    this._repoOwner = repoOwner;
    this._repoName = repoName;
    this._repoBranch = repoBranch;
  }

  async initialize() {
    if (!this.isConnectorDefinitionFileExist()) {
      await this.downloadConnector();
    }
    this._connectorSchema = await this.parseAndValidateConnector();
  }

  get key(): string {
    return this.installedConnectorConfig.Key;
  }

  get repoOwner(): string {
    return this._repoOwner;
  }

  get repoName(): string {
    return this._repoName;
  }

  get repoBranch(): string {
    return this._repoBranch;
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
      await git.clone(this.repositoryUrl, this.localFolderPath, ['--depth', '1', '--branch', this._repoBranch]);

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

  private async parseAndValidateConnector(): Promise<ConnectorSchemaType> {
    try {
      const connector = await readConnectorDefinitionFileUsingRequire(this.fullConnectorDefinitionPath);
      const connectorSchema = parseAndValidateConnector(connector);
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
    return `https://${credentials}github.com/${this._repoOwner}/${this._repoName}.git`;
  }

  private get localFolderPath(): string {
    return `connectors/${this._repoOwner}/${this._repoName}/${this._repoBranch}`;
  }

  private get fullConnectorDefinitionPath(): string {
    return `${process.cwd()}/${this.localFolderPath}/dist/connector.js`;
  }

  private get connectorDefinitionPath(): string {
    return `./${this.localFolderPath}/dist/connector.js`;
  }

  private parseConnectorKey(key: string): { repoOwner: string; repoName: string; repoBranch: string } {
    const [repo, branch] = key.split('@');
    const [owner, name] = repo.split('/');
    return { repoOwner: owner, repoName: name, repoBranch: branch };
  }
}

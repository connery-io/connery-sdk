import { rmSync } from 'fs';
import { LocalConfigService } from './local-config.service';
import { Connector } from './connector';
import { Inject } from '@nestjs/common';
import { Action } from './action';

export class ConnectorsService {
  private _connectors: Connector[] = [];
  private _actions: Action[] = [];

  constructor(@Inject(LocalConfigService) private configService: LocalConfigService) {}

  async getConnector(repoOwner: string, repoName: string, repoBranch: string): Promise<Connector> {
    if (this._connectors.length === 0) {
      await this.initializeConnectors();
    }

    const connector = this._connectors.find(
      (connector) =>
        connector.repoOwner === repoOwner && connector.repoName === repoName && connector.repoBranch === repoBranch,
    );

    if (!connector) {
      throw new Error(`The connector '${repoOwner}/${repoName}@${repoBranch}' is not found on the runner.`);
    }

    return connector;
  }

  async getConnectors(): Promise<Connector[]> {
    if (this._connectors.length === 0) {
      await this.initializeConnectors();
    }

    return this._connectors;
  }

  async getAction(actionKey: string): Promise<Action> {
    if (this._actions.length === 0) {
      await this.initializeConnectors();
    }

    const action = this._actions.find((action) => action.key === actionKey);

    if (!action) {
      throw new Error(`The action '${actionKey}' is not found on the runner.`);
    }

    return action;
  }

  async getActions(): Promise<Action[]> {
    if (this._actions.length === 0) {
      await this.initializeConnectors();
    }

    return this._actions;
  }

  async initializeConnectors(): Promise<void> {
    const installedConnectorConfigs = this.configService.getInstalledConnectors();
    const runnerConfig = this.configService.getRunnerConfig();

    for (const installedConnectorConfig of installedConnectorConfigs) {
      const connector = new Connector(installedConnectorConfig, runnerConfig);
      await connector.initialize();

      const actions = await connector.getActions();
      this._actions.push(...actions);
      this._connectors.push(connector);
    }

    console.log(JSON.stringify({ type: 'system', message: 'All connectors initialized' }));
  }

  cleanConnectors(): void {
    rmSync('connectors', { recursive: true, force: true });
    this._connectors = [];
    this._actions = [];

    console.log(JSON.stringify({ type: 'system', message: 'All connectors removed from cache' }));
  }
}

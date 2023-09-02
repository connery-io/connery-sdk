import { rmSync } from 'fs';
import { LocalConfigService } from './local-config.service';
import { Connector } from './connector';
import { Inject } from '@nestjs/common';
import { Action } from './action';
import { find, filter } from 'lodash';

export class ConnectorsService {
  private _connectors: Connector[] = [];
  private _actions: Action[] = [];

  constructor(@Inject(LocalConfigService) private configService: LocalConfigService) {}

  async getConnectors(): Promise<Connector[]> {
    if (this._connectors.length === 0) {
      await this.initializeConnectors();
    }

    return this._connectors;
  }

  async getConnector(connectorKey: string): Promise<Connector> {
    if (this._connectors.length === 0) {
      await this.initializeConnectors();
    }

    const connector = find(this._connectors, { key: connectorKey });

    if (!connector) {
      throw new Error(`The connector '${connectorKey}' is not found on the runner.`);
    }

    return connector;
  }

  // Get action by key across all connectors on the runner
  async getAction(actionKey: string): Promise<Action> {
    if (this._actions.length === 0) {
      await this.initializeConnectors();
    }

    const actions = filter(this._actions, { key: actionKey });

    if (actions.length === 0) {
      throw new Error(`The action '${actionKey}' is not found on the runner.`);
    } else if (actions.length > 1) {
      // TODO: handle this case properly
      throw new Error(`The action '${actionKey}' is found on multiple connectors on the runner.`);
    } else {
      return actions[0];
    }
  }

  // Get actions across all connectors on the runner
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

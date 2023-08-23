import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ApiKeyConfigType, InstalledConnectorConfigType, RunnerConfigType } from './types';

@Injectable()
export class LocalConfigService {
  constructor(private configService: ConfigService) {}

  verifyAccess(apiKey: string): boolean {
    let isAccessAllowed = false;

    if (!apiKey) throw new UnauthorizedException('API key is not provided');

    const apiKeys = this.configService.get<ApiKeyConfigType[]>('ApiKeys');
    if (apiKeys) {
      apiKeys.forEach((item) => {
        if (item.ApiKey === apiKey) {
          isAccessAllowed = true;
          return;
        }
      });
    }

    if (!isAccessAllowed) throw new UnauthorizedException('API key is not valid');

    return isAccessAllowed;
  }

  getInstalledConnectors(): InstalledConnectorConfigType[] {
    const installedConnectors = this.configService.get<InstalledConnectorConfigType[]>('InstalledConnectors');
    return installedConnectors ?? [];
  }

  getRunnerConfig(): RunnerConfigType {
    const runnerConfig = this.configService.get<RunnerConfigType>('RunnerConfig');

    if (!runnerConfig) {
      throw new Error('RunnerConfig is not defined in the configuration');
    }

    return runnerConfig;
  }
}

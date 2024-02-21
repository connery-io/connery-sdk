import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ApiKeyConfig, InstalledPluginConfig, RunnerConfig } from './types';
import { IConfig } from './config.interface';

@Injectable()
export class LocalConfigService implements IConfig {
  constructor(private configService: ConfigService) {}

  verifyAccess(apiKey: string): boolean {
    let isAccessAllowed = false;

    if (!apiKey) throw new UnauthorizedException('API key is not provided');

    const apiKeys = this.configService.get<ApiKeyConfig[]>('apiKeys');
    if (apiKeys) {
      apiKeys.forEach((item) => {
        if (item.apiKey === apiKey) {
          isAccessAllowed = true;
          return;
        }
      });
    }

    if (!isAccessAllowed) throw new UnauthorizedException('API key is not valid');

    return isAccessAllowed;
  }

  getInstalledPlugins(): InstalledPluginConfig[] {
    const installedPlugins = this.configService.get<InstalledPluginConfig[]>('installedPlugins');
    return installedPlugins ?? [];
  }

  getRunnerConfig(): RunnerConfig {
    const runnerConfig = this.configService.get<RunnerConfig>('runnerConfig');

    if (!runnerConfig) {
      throw new Error('RunnerConfig is not defined in the configuration');
    }

    return runnerConfig;
  }
}

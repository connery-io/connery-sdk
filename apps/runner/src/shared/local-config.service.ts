import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ApiKeyConfigType, InstalledConnectorConfigType, RunnerConfigType } from './types';

@Injectable()
export class LocalConfigService {
  constructor(private configService: ConfigService) {}

  verifyAccess(apiKey: string): boolean {
    let isAccessAllowed = false;

    if (!apiKey) throw new UnauthorizedException('API key is not provided');

    this.configService.get<ApiKeyConfigType[]>('ApiKeys').forEach((item) => {
      if (item.ApiKey === apiKey) {
        isAccessAllowed = true;
        return;
      }
    });

    if (!isAccessAllowed) throw new UnauthorizedException('API key is not valid');

    return isAccessAllowed;
  }

  getInstalledConnectors(): InstalledConnectorConfigType[] {
    return this.configService.get<InstalledConnectorConfigType[]>('InstalledConnectors');
  }

  getRunnerConfig(): RunnerConfigType {
    return this.configService.get<RunnerConfigType>('RunnerConfig');
  }
}

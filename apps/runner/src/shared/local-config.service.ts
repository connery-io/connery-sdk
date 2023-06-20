import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ApiKeyConfigType, InstalledConnectorConfigType, RunnerConfigType } from './types';

@Injectable()
export class LocalConfigService {
  constructor(private configService: ConfigService) {}

  verifyAccess(apiKey: string): void {
    let isAccessAllowed = false;

    this.configService.get<ApiKeyConfigType[]>('ApiKeys').forEach((item) => {
      if (item.ApiKey === apiKey) {
        isAccessAllowed = true;
        return;
      }
    });

    if (!isAccessAllowed) {
      throw new HttpException('API key is not valid.', HttpStatus.UNAUTHORIZED);
    }
  }

  getInstalledConnectors(): InstalledConnectorConfigType[] {
    return this.configService.get<InstalledConnectorConfigType[]>('InstalledConnectors');
  }

  getRunnerConfig(): RunnerConfigType {
    return this.configService.get<RunnerConfigType>('RunnerConfig');
  }
}

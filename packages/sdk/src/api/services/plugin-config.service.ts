import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PluginConfigService {
  constructor(private configService: ConfigService) {}

  get pluginUrl(): string {
    const pluginUrl = this.configService.get<string>('PLUGIN_URL');
    if (!pluginUrl) {
      throw new Error('PLUGIN_URL environment variable is not set');
    }
    return pluginUrl;
  }

  get apiKey(): string {
    const apiKey = this.configService.get<string>('API_KEY');
    if (!apiKey) {
      throw new Error('API_KEY environment variable is not set');
    }
    return apiKey;
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFile } from 'fs/promises';
import { ConfigurationObject, ConfigurationValue } from '../../sdk';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

@Injectable()
export class PluginConfigService {
  private static readonly pluginUrlSchema = z
    .string()
    .url()
    .regex(
      /^(http:\/\/|https:\/\/)[^\s\/]+[^\/]$/,
      'The URL must start with http:// or https:// and not end with a slash',
    );
  private static readonly apiKeySchema = z.string().min(1);
  private static readonly validationErrorConfig = {
    prefix: '[Environment configuration validation error]',
    prefixSeparator: ' ',
  };

  constructor(private configService: ConfigService) {}

  get pluginUrl(): string {
    const pluginUrl = this.configService.get('PLUGIN_URL');

    const result = PluginConfigService.pluginUrlSchema.safeParse(pluginUrl);
    if (!result.success) {
      const userFriendlyValidationError = fromZodError(result.error, PluginConfigService.validationErrorConfig);
      throw new Error(userFriendlyValidationError.message);
    }

    return pluginUrl;
  }

  get apiKey(): string {
    const apiKey = this.configService.get('API_KEY');

    const result = PluginConfigService.apiKeySchema.safeParse(apiKey);
    if (!result.success) {
      const userFriendlyValidationError = fromZodError(result.error, PluginConfigService.validationErrorConfig);
      throw new Error(userFriendlyValidationError.message);
    }

    return apiKey;
  }

  get configuration(): ConfigurationObject {
    const allEnvVars = Object.keys(process.env);
    const configVars = allEnvVars.filter((key) => key.startsWith('CONFIG_'));
    const configurationObject = configVars.reduce((acc: ConfigurationObject, curr: ConfigurationValue) => {
      const key = curr.replace('CONFIG_', '');
      acc[key] = this.getConfigurationParameter(curr);
      return acc;
    }, {});

    return configurationObject;
  }

  async getSdkVersion(): Promise<string> {
    const data = await readFile(new URL('./../../../package.json', import.meta.url), { encoding: 'utf8' });
    const packageJson = JSON.parse(data);
    return packageJson.version as string;
  }

  // This method is used to validate the environment configuration on application startup.
  // All the other methods validate the configuration on demand.
  static validateEnvConfig(config: Record<string, any>): Record<string, any> {
    const requiredEnvSchema = z.object({
      PLUGIN_URL: PluginConfigService.pluginUrlSchema,
      API_KEY: PluginConfigService.apiKeySchema,
    });

    const result = requiredEnvSchema.safeParse(config);
    if (!result.success) {
      const userFriendlyValidationError = fromZodError(result.error, PluginConfigService.validationErrorConfig);
      throw new Error(userFriendlyValidationError.message);
    }

    // Merge validated required variables with all other variables (including optional ones)
    return {
      ...config,
      ...result.data,
    };
  }

  private getConfigurationParameter(key: string): ConfigurationValue {
    const configurationParameter = this.configService.get<ConfigurationValue>(key);

    if (!configurationParameter) {
      throw new Error(`ENV configuration parameter ${key} is missing`);
    }

    return configurationParameter;
  }
}

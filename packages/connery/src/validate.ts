import { PluginLoader } from 'lib';
import { logEmptyLine, logError, logErrorBody, logInfo, logSuccess } from './shared';

export default async function (): Promise<void> {
  try {
    logEmptyLine();
    logInfo('🔎 Validating plugin definition in ./dist/plugin.js file...');

    const pluginDefinitionPath = `${process.cwd()}/dist/plugin.js`;

    // Check if ./dist/plugin.js exists
    try {
      await import(pluginDefinitionPath);
    } catch (error: any) {
      if (error.code === 'ERR_MODULE_NOT_FOUND') {
        throw new Error('Plugin definition file ./dist/plugin.js is not found. Please build the plugin first.');
      } else {
        throw error;
      }
    }

    // Check if ./dist/plugin.js exports a valid plugin definition
    // _pluginKey and _configurationParametersObject are not required for validation
    const pluginLoader = new PluginLoader(pluginDefinitionPath, '', {});
    await pluginLoader.load();

    logSuccess('Plugin definition is valid');
    logEmptyLine();
  } catch (error: any) {
    logError('Error occurred while validating plugin definition');
    logErrorBody(error.message);
    throw error;
  }
}

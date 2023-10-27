import { PluginLoader } from 'lib';
import { checkFileExists, logEmptyLine, logError, logErrorBody, logInfo, logSuccess } from './shared';

export default async function (): Promise<void> {
  try {
    logEmptyLine();
    logInfo('🔎 Validating plugin definition in ./dist/plugin.js file...');

    const pluginDefinitionPath = `${process.cwd()}/dist/plugin.js`;

    // Check if ./dist/plugin.js exists
    if (!(await checkFileExists(pluginDefinitionPath))) {
      throw new Error('Plugin file "./dist/plugin.js" is not found. Please build the plugin first.');
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

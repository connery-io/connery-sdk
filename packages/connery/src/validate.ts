import { PluginLoader } from 'lib';
import { checkPluginFileExists, logEmptyLine, logError, logErrorBody, logInfo, logSuccess } from './shared';

export default async function (): Promise<void> {
  try {
    const pluginDefinitionPath = `${process.cwd()}/dist/plugin.js`;

    logEmptyLine();
    logInfo(`🔎 Validating plugin definition in '${pluginDefinitionPath}' file...`);

    await checkPluginFileExists(pluginDefinitionPath);

    // Load the plugin from ./dist/plugin.js to check if it exports a valid plugin definition
    // _pluginKey and _configurationParametersObject parameters are not required for validation
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

import { PluginLoader } from 'lib';
import {
  checkPluginFileExists,
  logEmptyLine,
  logError,
  logErrorBody,
  logInfo,
  logSuccess,
  fullPluginFilePath,
} from './shared';

export default async function (): Promise<void> {
  try {
    logEmptyLine();
    logInfo(`🔎 Validating plugin definition in '${fullPluginFilePath}' file...`);

    await checkPluginFileExists();

    // Init the plugin. It will load the plugin definition to memory and validate it.
    const pluginLoader = new PluginLoader();
    await pluginLoader.init(fullPluginFilePath);

    logSuccess('Plugin definition is valid');
    logEmptyLine();
  } catch (error: any) {
    logError('Error occurred while validating plugin definition');
    logErrorBody(error.message);
    throw error;
  }
}

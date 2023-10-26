import { PluginLoader } from 'lib';
import { logEmptyLine, logError, logErrorBody, logInfo, logSuccess } from './shared';

export default async function (): Promise<void> {
  try {
    logEmptyLine();
    logInfo('🔎 Validating plugin definition in ./dist/plugin.js file...');

    // TODO: check if plugin.js exists and ask to build if not
    const pluginLoader = new PluginLoader(`${process.cwd()}/dist/plugin.js`, '123', {}); // TODO fix parameters
    await pluginLoader.load();

    logSuccess('Plugin definition is valid');
    logEmptyLine();
  } catch (error: any) {
    logError('Error occurred while validating plugin definition');
    logErrorBody(error.message);
    throw error;
  }
}

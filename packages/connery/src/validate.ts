import { parseAndValidateConnector, readConnectorDefinitionFileUsingImport } from 'lib';
import { logError, logErrorBody, logInfo, logSuccess } from './shared';

export default async function (): Promise<void> {
  try {
    logInfo('🔎 Validating connector definition in ./index.js and linked files...');
    const connector = await readConnectorDefinitionFileUsingImport(`${process.cwd()}/index.js`);
    parseAndValidateConnector(connector);
    logSuccess('Connector definition is valid');
  } catch (error: any) {
    logError('Error occurred while validating connector definition');
    logErrorBody(error.message);
    return;
  }
}

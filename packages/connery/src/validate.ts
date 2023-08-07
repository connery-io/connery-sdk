import { parseAndValidateConnector, readConnectorDefinitionFileUsingImport } from 'lib';
import { logEmptyLine, logError, logErrorBody, logInfo, logSuccess } from './shared';

export default async function (): Promise<void> {
  try {
    logEmptyLine();
    logInfo('🔎 Validating connector definition in ./index.js and linked files...');
    const connector = await readConnectorDefinitionFileUsingImport(`${process.cwd()}/index.js`);
    parseAndValidateConnector(connector);
    logSuccess('Connector definition is valid');
    logEmptyLine();
  } catch (error: any) {
    logError('Error occurred while validating connector definition');
    logErrorBody(error.message);
    throw error;
  }
}

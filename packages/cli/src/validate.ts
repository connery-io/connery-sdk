import { parseAndValidateConnector, readConnectorDefinitionFileUsingImport } from 'lib';

export default async function (): Promise<void> {
  try {
    console.log('🔎 Validating connector definition in ./index.js file and linked files...');
    const connector = await readConnectorDefinitionFileUsingImport(`${process.cwd()}/index.js`);
    parseAndValidateConnector(connector);
    console.log('✅ Connector definition is valid');
  } catch (error: any) {
    console.log('🔴 Error occurred while validating connector definition');
    console.log(error.message);
    return;
  }
}

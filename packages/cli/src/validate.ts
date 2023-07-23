import { parseAndValidateConnectorSchema } from 'connector-schema';

export default async function (): Promise<void> {
  try {
    parseAndValidateConnectorSchema(`${process.cwd()}/index.js`);
    console.log('✅ Connector definition is valid');
  } catch (error: any) {
    console.log('🔴 Error occurred while validating connector definition');
    console.log(error.message);
    return;
  }
}

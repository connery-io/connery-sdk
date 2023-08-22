import { fromZodError } from 'zod-validation-error';
import { ConnectorSchema, ConnectorSchemaType } from './connector.schema';
import { import_ } from '@brillout/import';
import * as _ from 'lodash';

// Used in the Runner
export async function readConnectorDefinitionFileUsingRequire(fullConnectorDefinitionPath: string): Promise<string> {
  // clear require cache to avoid issues with connector cache cleanup
  delete require.cache[fullConnectorDefinitionPath];

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const connector = require(fullConnectorDefinitionPath);
  return connector;
}

// Used in the CLI
export async function readConnectorDefinitionFileUsingImport(fullConnectorDefinitionPath: string): Promise<string> {
  // TODO: Use timestamp as cache buster to clear import cache
  const connector = await import_(`${fullConnectorDefinitionPath}`);
  return connector.default;
}

export function parseAndValidateConnector(connector: string): ConnectorSchemaType {
  try {
    return ConnectorSchema.parse(connector);
  } catch (error: any) {
    const userFriendlyValidationError = fromZodError(error, { prefix: '', prefixSeparator: '' });
    throw new Error(userFriendlyValidationError.message);
  }
}

export function getAction(connector: ConnectorSchemaType, actionKey: string) {
  const action = _.find(connector.actions, { key: actionKey });

  if (!action) {
    throw new Error(`Action '${actionKey}' not found.`);
  }
  return action;
}

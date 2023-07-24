import { fromZodError } from 'zod-validation-error';
import { ConnectorSchema, ConnectorSchemaType } from './connector.schema';

export function parseAndValidateConnectorSchema(fullConnectorDefinitionPath: string): ConnectorSchemaType {
  // clear require cache to avoid issues with connector cache cleanup
  delete require.cache[fullConnectorDefinitionPath];

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const connectorSchema = require(fullConnectorDefinitionPath);

  try {
    return ConnectorSchema.parse(connectorSchema);
  } catch (error: any) {
    const userFriendlyValidationError = fromZodError(error, { prefix: '', prefixSeparator: '' });
    throw new Error(userFriendlyValidationError.message);
  }
}

import { ActionDefinition, PluginDefinition } from '@connery-io/sdk';
import { fromZodError } from 'zod-validation-error';
import * as zod from 'zod';

const keyRegex = /^[A-Z][a-zA-Z0-9]*$/;
const keyRegexMessage = 'Key must be in PascalCase and start with a letter';

//
// Validation functions
//

export function validatePluginDefinitionWithoutActions(plugin: PluginDefinition): void {
  try {
    PluginSchema.parse(plugin);
  } catch (error: any) {
    const userFriendlyValidationError = fromZodError(error, { prefix: '', prefixSeparator: '' });
    throw new Error(userFriendlyValidationError.message);
  }
}

export function validateActionDefinitions(actions: ActionDefinition[]): void {
  actions.forEach((action) => {
    try {
      ActionSchema.parse(action);
    } catch (error: any) {
      const userFriendlyValidationError = fromZodError(error, { prefix: '', prefixSeparator: '' });
      throw new Error(userFriendlyValidationError.message);
    }
  });
}

//
// Schemas
//

const ValidationSchema = zod
  .object({
    Required: zod.boolean().optional(),
  })
  .strict();

const InputParameterSchema = zod
  .object({
    Key: zod.string().regex(keyRegex, { message: keyRegexMessage }).min(1).max(50),
    Title: zod.string().min(1).max(100),
    Description: zod.string().max(2000).optional(),
    Type: zod.enum(['string']),
    Validation: ValidationSchema.optional(),
  })
  .strict();

const OutputParameterSchema = zod
  .object({
    Key: zod.string().regex(keyRegex, { message: keyRegexMessage }).min(1).max(50),
    Title: zod.string().min(1).max(100),
    Description: zod.string().max(2000).optional(),
    Type: zod.enum(['string']),
    Validation: ValidationSchema.optional(),
  })
  .strict();

const OperationSchema = zod
  .object({
    Handler: zod.function(),
  })
  .strict();

const ActionSchema = zod
  .object({
    Key: zod.string().regex(keyRegex, { message: keyRegexMessage }).min(1).max(50),
    Title: zod.string().min(1).max(100),
    Description: zod.string().max(2000).optional(),
    Type: zod.enum(['create', 'read', 'update', 'delete']),
    InputParameters: zod
      .array(InputParameterSchema)
      .refine(uniqueKeysValidator, { message: 'Input parameters must have unique keys' }),
    Operation: OperationSchema,
    OutputParameters: zod
      .array(OutputParameterSchema)
      .refine(uniqueKeysValidator, { message: 'Output parameters must have unique keys' }),
  })
  .strict();

const ConfigurationParameterSchema = zod
  .object({
    Key: zod.string().regex(keyRegex, { message: keyRegexMessage }).min(1).max(50),
    Title: zod.string().min(1).max(100),
    Description: zod.string().max(2000).optional(),
    Type: zod.enum(['string']),
    Validation: ValidationSchema.optional(),
  })
  .strict();

const MaintainerSchema = zod
  .object({
    Name: zod.string().min(1).max(100),
    Email: zod.string().email().min(1).max(100),
  })
  .strict();

const ConnerySchema = zod
  .object({
    RunnerVersion: zod.enum(['0']),
  })
  .strict();

const ActionsType = zod.union([
  zod.array(ActionSchema).min(1).refine(uniqueKeysValidator, { message: 'Actions must have unique keys' }),
  zod.function(),
]);

const PluginSchema = zod
  .object({
    Title: zod.string().min(1).max(100),
    Description: zod.string().max(2000).optional(),
    Actions: ActionsType,
    ConfigurationParameters: zod
      .array(ConfigurationParameterSchema)
      .refine(uniqueKeysValidator, { message: 'Configuration parameters must have unique keys' }),
    Maintainers: zod.array(MaintainerSchema).min(1),
    Connery: ConnerySchema,
  })
  .strict();

//
// Custom validators
//

function uniqueKeysValidator(array: any[]) {
  const keys = array.map((item: { Key: string }) => item.Key);
  return new Set(keys).size === keys.length;
}

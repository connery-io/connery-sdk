import * as zod from 'zod';

const keyRegex = /^[A-Z][a-zA-Z0-9]*$/;
const keyRegexMessage = 'Key must be in PascalCase and start with a letter';

//
// Types
//

export type ValidationSchemaType = zod.infer<typeof ValidationSchema>;
export type InputParameterSchemaType = zod.infer<typeof InputParameterSchema>;
export type OutputParameterSchemaType = zod.infer<typeof OutputParameterSchema>;
export type JavaScriptOperationSchemaType = zod.infer<typeof JavaScriptOperationSchema>;
export type ActionSchemaType = zod.infer<typeof ActionSchema>;
export type ConfigurationParameterSchemaType = zod.infer<typeof ConfigurationParameterSchema>;
export type MaintainerSchemaType = zod.infer<typeof MaintainerSchema>;
export type ConnectorSchemaType = zod.infer<typeof ConnectorSchema>;

//
// Schemas
//

export const ValidationSchema = zod
  .object({
    required: zod.boolean().optional(),
  })
  .strict();

export const InputParameterSchema = zod
  .object({
    key: zod.string().regex(keyRegex, { message: keyRegexMessage }).min(1).max(50),
    title: zod.string().min(1).max(100),
    description: zod.string().max(2000).optional(),
    type: zod.enum(['string']),
    validation: ValidationSchema.optional(),
  })
  .strict();

export const OutputParameterSchema = zod
  .object({
    key: zod.string().regex(keyRegex, { message: keyRegexMessage }).min(1).max(50),
    title: zod.string().min(1).max(100),
    description: zod.string().max(2000).optional(),
    type: zod.enum(['string']),
    validation: ValidationSchema.optional(),
  })
  .strict();

export const JavaScriptOperationSchema = zod
  .object({
    type: zod.enum(['js']),
    handler: zod.function(),
  })
  .strict();

export const ActionSchema = zod
  .object({
    key: zod.string().regex(keyRegex, { message: keyRegexMessage }).min(1).max(50),
    title: zod.string().min(1).max(100),
    description: zod.string().max(2000).optional(),
    type: zod.enum(['create', 'read', 'update', 'delete']),
    inputParameters: zod
      .array(InputParameterSchema)
      .refine(uniqueKeysValidator, { message: 'Input parameters must have unique keys' }),
    operation: JavaScriptOperationSchema,
    outputParameters: zod
      .array(OutputParameterSchema)
      .refine(uniqueKeysValidator, { message: 'Output parameters must have unique keys' }),
  })
  .strict();

export const ConfigurationParameterSchema = zod
  .object({
    key: zod.string().regex(keyRegex, { message: keyRegexMessage }).min(1).max(50),
    title: zod.string().min(1).max(100),
    description: zod.string().max(2000).optional(),
    type: zod.enum(['string']),
    validation: ValidationSchema.optional(),
  })
  .strict();

export const MaintainerSchema = zod
  .object({
    name: zod.string().min(1).max(100),
    email: zod.string().email().min(1).max(100),
  })
  .strict();

export const ConnerySchema = zod
  .object({
    runnerVersion: zod.enum(['0']),
  })
  .strict();

export const ConnectorSchema = zod
  .object({
    title: zod.string().min(1).max(100),
    description: zod.string().max(2000).optional(),
    actions: zod.array(ActionSchema).min(1).refine(uniqueKeysValidator, { message: 'Actions must have unique keys' }),
    configurationParameters: zod
      .array(ConfigurationParameterSchema)
      .refine(uniqueKeysValidator, { message: 'Configuration parameters must have unique keys' }),
    maintainers: zod.array(MaintainerSchema).min(1),
    connery: ConnerySchema,
  })
  .strict();

//
// Custom validators
//

function uniqueKeysValidator(array: any[]) {
  const keys = array.map((item: { key: any }) => item.key);
  return new Set(keys).size === keys.length;
}

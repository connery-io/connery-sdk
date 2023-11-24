import { OpenAiFunctionSchema } from './types';

export interface IOpenAI {
  getOpenAiFunctionsSpec(includeRequiredConfig: boolean): Promise<OpenAiFunctionSchema[]>;
}

// Used as a dependency injection token in NestJS
export const IOpenAI = Symbol('IOpenAI');

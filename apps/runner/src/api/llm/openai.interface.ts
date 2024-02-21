import { OpenAiFunctionSchema } from '../../types/llm-types';

export interface IOpenAI {
  getOpenAiFunctionsSpec(includeRequiredConfig: boolean): Promise<OpenAiFunctionSchema[]>;
}

// Used as a dependency injection token in NestJS
export const IOpenAI = Symbol('IOpenAI');

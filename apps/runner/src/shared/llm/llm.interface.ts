import { ActionIdentifiedOutput, ActionNotIdentifiedOutput } from './types';

export interface ILlm {
  identifyAction(prompt: string): Promise<ActionIdentifiedOutput | ActionNotIdentifiedOutput>;
}

// Used as a dependency injection token in NestJS
export const ILlm = Symbol('ILlm');

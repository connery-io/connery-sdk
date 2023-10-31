import { ActionIdentifiedOutput, ActionNotIdentifiedOutput } from './types';

export interface ILlm {
  identifyAction(prompt: string): Promise<ActionIdentifiedOutput | ActionNotIdentifiedOutput>;
}

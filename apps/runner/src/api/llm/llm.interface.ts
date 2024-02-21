import { ActionRuntime } from ':src/lib/action-runtime';
import { ActionIdentifiedOutput, ActionNotIdentifiedOutput } from './types';
import { InputParametersObject } from ':src/sdk/types';

export interface ILlm {
  identifyAction(prompt: string): Promise<ActionIdentifiedOutput | ActionNotIdentifiedOutput>;
  identifyActionInput(action: ActionRuntime, prompt?: string): Promise<InputParametersObject>;
}

// Used as a dependency injection token in NestJS
export const ILlm = Symbol('ILlm');

import { ActionRuntime } from 'lib';
import { ActionIdentifiedOutput, ActionNotIdentifiedOutput } from './types';
import { InputParametersObject } from '@connery-io/sdk';

export interface ILlm {
  identifyAction(prompt: string): Promise<ActionIdentifiedOutput | ActionNotIdentifiedOutput>;
  identifyActionInput(action: ActionRuntime, prompt?: string): Promise<InputParametersObject>;
}

// Used as a dependency injection token in NestJS
export const ILlm = Symbol('ILlm');

import { ActionRuntime } from 'lib';
import {
  ActionIdentifiedOutput,
  ActionInputParametersIdentifiedOutput,
  ActionInputParametersNotIdentifiedOutput,
  ActionNotIdentifiedOutput,
} from './types';

export interface ILlm {
  identifyAction(prompt: string): Promise<ActionIdentifiedOutput | ActionNotIdentifiedOutput>;
  identifyActionInputParameters(
    prompt: string,
    action: ActionRuntime,
  ): Promise<ActionInputParametersIdentifiedOutput | ActionInputParametersNotIdentifiedOutput>;
}

// Used as a dependency injection token in NestJS
export const ILlm = Symbol('ILlm');

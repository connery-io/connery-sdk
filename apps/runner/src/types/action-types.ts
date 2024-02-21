import { OutputParametersObject } from ':src/types/context';
import { InputParametersObject } from ':src/types/context';

export type ActionOutput = {
  output: OutputParametersObject;
  used: UsedToRunAction;
};

export type UsedToRunAction = {
  actionId: string;
  input: InputParametersObject;
};

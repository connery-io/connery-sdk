import { InputParametersObject, OutputParametersObject } from ':src/sdk/types';

export type ActionOutput = {
  output: OutputParametersObject;
  used: UsedToRunAction;
};

export type UsedToRunAction = {
  actionId: string;
  input: InputParametersObject;
};

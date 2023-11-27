import { InputParametersObject, OutputParametersObject } from '@connery-io/sdk';

export type ActionOutput = {
  output: OutputParametersObject;
  used: UsedToRunAction;
};

export type UsedToRunAction = {
  actionId: string;
  input: InputParametersObject;
};

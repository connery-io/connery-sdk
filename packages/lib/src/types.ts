import { InputParametersObject, OutputParametersObject } from '@connery-io/sdk';

export type ActionOutput = {
  output: OutputParametersObject;
  used: UsedToRunAction;
};

export type UsedToRunAction = {
  pluginKey: string;
  actionKey: string;
  inputParameters: InputParametersObject;
};

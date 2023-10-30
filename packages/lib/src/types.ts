import { InputParametersObject, OutputParametersObject } from '@connery-io/sdk';

export type ActionOutput = {
  output: OutputParametersObject;
  usedConnectorKey: string;
  usedActionKey: string;
  usedInputParameters: InputParametersObject;
};

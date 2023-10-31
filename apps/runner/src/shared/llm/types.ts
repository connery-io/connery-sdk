import { InputParametersObject } from '@connery-io/sdk';

export type ActionIdentifiedOutput = {
  identified: true;
  pluginKey: string;
  actionKey: string;
  inputParameters: InputParametersObject;
  used: {
    prompt: string;
  };
};

export type ActionNotIdentifiedOutput = {
  identified: false;
  used: {
    prompt: string;
  };
};

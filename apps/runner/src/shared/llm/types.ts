import { InputParametersObject } from '@connery-io/sdk';

//
// General
//

export type ActionIdentifiedOutput = {
  identified: true;
  actionId: string;
  input: InputParametersObject;
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

//
// OpenAI
//

export type OpenAiFunctionSchema = {
  name: string;
  description: string;
  parameters: {
    type: 'object';
    properties: {
      [key: string]: {
        type: 'string';
        description: string;
      };
    };
    required: string[];
  };
};

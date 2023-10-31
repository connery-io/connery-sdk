export type RunActionInput = {
  [key: string]: string;
};

export type RunActionOutput = {
  output: {
    [key: string]: string;
  };
  used: {
    connectorKey: string;
    actionKey: string;
    inputParameters: {
      [key: string]: string;
    };
  };
};

export type InputParameter = {
  key: string;
  title: string;
  description?: string;
  type: string;
  validation?: {
    required?: boolean;
  };
};

export type OutputParameter = {
  key: string;
  title: string;
  description?: string;
  type: string;
  validation?: {
    required?: boolean;
  };
};

export type ActionOutput = {
  key: string;
  title: string;
  description?: string;
  type: string;
  inputParameters: InputParameter[];
  outputParameters: OutputParameter[];
};

export type ConnectorOutput = {
  key: string;
  title: string;
  description?: string;
  actions: ActionOutput[];
};

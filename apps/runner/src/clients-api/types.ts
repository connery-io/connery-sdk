export type RunActionInput = {
  [key: string]: string;
};

export type RunActionWithPromptInput = {
  prompt: string;
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

// Object of this type is returned when the action was run with the prompt
export type RunActionWithPromptOutput1 = {
  response: string;
  output: {
    [key: string]: string;
  };
  used: {
    prompt: string;
    connectorKey: string;
    actionKey: string;
    inputParameters: {
      [key: string]: string;
    };
  };
};

// Object of this type is returned when the action was not run with the prompt.
export type RunActionWithPromptOutput2 = {
  response: string;
  used: {
    prompt: string;
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

export type PaginatedResponse<T> = {
  status: 'success';
  data: T;
};

export type ObjectResponse<T> = {
  status: 'success';
  data: T;
};

export type ErrorResponse = {
  status: 'error';
  error: {
    message: string;
  };
};

export type RunActionInput = {
  [key: string]: string;
};

export type RunActionWithPromptInput = {
  prompt: string;
};

export type RunActionOutput = {
  result: {
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

export type RunActionWithPromptOutput = {
  summary: string;
  result?: {
    [key: string]: string;
  };
  used: {
    prompt: string;
    connectorKey?: string;
    actionKey?: string;
    inputParameters?: {
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

export type PaginatedResponse<T> = {
  status: 'success' | 'error';
  data?: T;
  error?: {
    message: string;
  };
};

export type ObjectResponse<T> = {
  status: 'success' | 'error';
  data?: T;
  error?: {
    message: string;
  };
};

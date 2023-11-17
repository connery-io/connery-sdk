//
// API response types
//

export type PaginatedResponse<T> = {
  status: 'success';
  data: T[];
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

//
// Other types
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

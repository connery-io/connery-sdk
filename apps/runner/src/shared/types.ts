//
// API response types
//

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

// At the moment we only support string parameters.
// In the future we may support other types, such as boolean, number, etc.
// That's why we have a separate type for parameter values.
export type InputValue = string;
export type OutputValue = string;

export interface InputObject {
  [key: string]: InputValue;
}

export interface OutputObject {
  [key: string]: OutputValue;
}

export interface ActionContext {
  input: InputObject;
}

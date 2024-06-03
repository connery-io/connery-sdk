import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ActionRuntime, PluginRuntime } from '../types/runtime';
import { InputParameterDefinition, OutputParameterDefinition, ValidationDefinition } from '../types/definition';
import { InputObject, OutputObject } from '../types/context';

//
// Generic response types
//

export class GenericPaginatedResponse<T> {
  @ApiProperty({
    enum: ['success'],
  })
  status: 'success';

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
    },
  })
  data: T[];

  constructor(data: T[]) {
    this.status = 'success';
    this.data = data;
  }
}

export class GenericObjectResponse<T> {
  @ApiProperty({
    enum: ['success'],
  })
  status: 'success';

  @ApiProperty({
    type: 'object',
  })
  data: T;

  constructor(data: T) {
    this.status = 'success';
    this.data = data;
  }
}

export class Error {
  @ApiProperty()
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export class GenericErrorResponse {
  @ApiProperty({
    enum: ['error'],
  })
  status: 'error';

  @ApiProperty({
    type: Error,
  })
  error: Error;

  constructor(message: string) {
    this.status = 'error';
    this.error = {
      message,
    };
  }
}

//
// Response types
//

export class Validation {
  @ApiPropertyOptional()
  required?: boolean;

  constructor(validation?: ValidationDefinition) {
    this.required = validation?.required;
  }
}

export class Plugin {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  constructor(plugin: PluginRuntime) {
    this.name = plugin.name;
    this.description = plugin.description;
  }
}

export class InputParameter {
  @ApiProperty()
  key: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty({
    enum: ['string'],
  })
  type: 'string';

  @ApiPropertyOptional({
    type: Validation,
  })
  validation?: Validation;

  constructor(inputParameter: InputParameterDefinition) {
    this.key = inputParameter.key;
    this.name = inputParameter.name;
    this.description = inputParameter.description;
    this.type = inputParameter.type;
    this.validation = new Validation(inputParameter.validation);
  }
}

export class OutputParameter {
  @ApiProperty()
  key: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty({
    enum: ['string'],
  })
  type: 'string';

  @ApiPropertyOptional({
    type: Validation,
  })
  validation?: Validation;

  constructor(outputParameter: OutputParameterDefinition) {
    this.key = outputParameter.key;
    this.name = outputParameter.name;
    this.description = outputParameter.description;
    this.type = outputParameter.type;
    this.validation = new Validation(outputParameter.validation);
  }
}

export class Action {
  @ApiProperty()
  key: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty({
    enum: ['create', 'read', 'update', 'delete'],
  })
  type: 'create' | 'read' | 'update' | 'delete';

  @ApiProperty({
    type: InputParameter,
    isArray: true,
    title: 'Metadata of the action input parameters.',
  })
  inputParameters: InputParameter[];

  @ApiProperty({
    type: OutputParameter,
    isArray: true,
    title: 'Metadata of the action output parameters.',
  })
  outputParameters: OutputParameter[];

  constructor(action: ActionRuntime) {
    this.key = action.key;
    this.name = action.name;
    this.description = action.description;
    this.type = action.type;
    this.inputParameters = action.inputParameters.map((inputParameter) => new InputParameter(inputParameter));
    this.outputParameters = action.outputParameters.map((outputParameter) => new OutputParameter(outputParameter));
  }
}

export class RunActionResponse {
  @ApiProperty({
    type: 'object',
    title: 'The output of the action run.',
    description: 'You can find the output parameters metadata in the action.',
    example: {
      outputParameterKey1: 'value1',
      outputParameterKey2: 'value2',
    },
  })
  output: {
    [key: string]: any;
  };

  constructor(output: OutputObject) {
    this.output = output;
  }
}

//
// Request types
//

export class RunActionRequest {
  @ApiProperty({
    type: 'object',
    title: 'The input for the action.',
    description: 'You can find the input parameters metadata in the action.',
    example: {
      inputParameterKey1: 'value1',
      inputParameterKey2: 'value2',
    },
  })
  input: {
    [key: string]: any;
  };

  // Hide this property in the Swagger UI to avoid confusing users and improve the user experience.
  // This property is supposed to be used in rare cases.
  @ApiHideProperty()
  configuration?: {
    [key: string]: any;
  };

  constructor(input: InputObject) {
    this.input = input;
  }
}

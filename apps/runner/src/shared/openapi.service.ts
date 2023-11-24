import { Inject, Injectable } from '@nestjs/common';
import { OpenAPIV3 } from 'openapi-types';
import { IConfig } from './config/config.interface';

interface ExtendedOperationObject extends OpenAPIV3.OperationObject {
  // This custom extension property is used by OpenAI Actions to determine if the action requires a confirmation before running.
  // See more details here: https://platform.openai.com/docs/actions/consequential-flag
  'x-openai-isConsequential'?: boolean;
}

@Injectable()
export class OpenApiService {
  constructor(@Inject(IConfig) private config: IConfig) {}

  getOpenApiSpecForActions(): OpenAPIV3.Document {
    const runnerConfig = this.config.getRunnerConfig();
    if (!runnerConfig.publicUrl) {
      throw new Error('The CONNERY_RUNNER_PUBLIC_URL is not configured on the runner.');
    }

    const openApiSchema: OpenAPIV3.Document = {
      openapi: '3.0.0',
      info: {
        title: 'OpenAPI Specification for Connery actions',
        description: 'This is the OpenAPI Specification actions available on the Connery runner.',
        version: '1.0.0',
      },
      externalDocs: {
        url: 'https://docs.connery.io',
      },
      servers: [
        {
          description: 'Runner URL',
          url: runnerConfig.publicUrl,
        },
      ],
      paths: {
        '/v1/actions': {
          get: {
            operationId: 'listActions',
            summary: 'List available actions',
            description:
              'List all available actions. If the user asked for the action you can not find in the list, try refreshing this list.',
            'x-openai-isConsequential': false,
            parameters: [],
            responses: {
              200: {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ActionListResponse',
                    },
                  },
                },
              },
              400: { $ref: '#/components/responses/ErrorResponse' },
              401: { $ref: '#/components/responses/ErrorResponse' },
              403: { $ref: '#/components/responses/ErrorResponse' },
              404: { $ref: '#/components/responses/ErrorResponse' },
              500: { $ref: '#/components/responses/ErrorResponse' },
            },
            security: [{ ApiKeyAuth: [] }],
          } as ExtendedOperationObject,
        },
        '/v1/actions/{actionId}/run': {
          post: {
            operationId: 'runAction',
            summary: 'Run action',
            description: 'Run an action with the user input.',
            'x-openai-isConsequential': false,
            parameters: [
              {
                name: 'actionId',
                in: 'path',
                required: true,
                schema: {
                  title: 'Action ID',
                  type: 'string',
                  pattern: '^CA[A-Z0-9]{30}$',
                  example: 'CABC80BB79C15067CA983495324AE709',
                },
                example: 'CABC80BB79C15067CA983495324AE709',
              },
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ActionRunRequest',
                  },
                },
              },
            },
            responses: {
              201: {
                description: 'Created',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ActionRunResponse',
                    },
                  },
                },
              },
              400: { $ref: '#/components/responses/ErrorResponse' },
              401: { $ref: '#/components/responses/ErrorResponse' },
              403: { $ref: '#/components/responses/ErrorResponse' },
              404: { $ref: '#/components/responses/ErrorResponse' },
              500: { $ref: '#/components/responses/ErrorResponse' },
            },
            security: [{ ApiKeyAuth: [] }],
          } as ExtendedOperationObject,
        },
      },
      components: {
        securitySchemes: {
          ApiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'x-api-key',
          },
        },
        schemas: {
          ActionListResponse: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                enum: ['success'],
              },
              data: {
                title: 'List of available actions',
                description: 'List of available actions.',
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Action',
                },
              },
            },
            required: ['status', 'data'],
          },
          Action: {
            title: 'Action object',
            description: 'Action object.',
            type: 'object',
            properties: {
              id: {
                title: 'Action ID',
                description: 'The unique ID of the action. This is used to run the action.',
                type: 'string',
                pattern: '^CA[A-Z0-9]{30}$',
              },
              title: {
                title: 'Action title',
                description: 'A short title of the action.',
                type: 'string',
              },
              description: {
                title: 'Action description',
                description: 'A description of the action.',
                type: 'string',
              },
              inputParameters: {
                title: 'Input parameters',
                description:
                  'The expected input parameters of the action. This is what the user needs to provide when running the action.',
                type: 'array',
                items: {
                  $ref: '#/components/schemas/InputParameter',
                },
              },
            },
            required: ['id', 'title', 'inputParameters'],
          },
          InputParameter: {
            type: 'object',
            properties: {
              key: {
                title: 'Parameter key',
                description:
                  'The key of the parameter. This is used to specify the input value when running the action.',
                type: 'string',
              },
              title: {
                title: 'Parameter title',
                description: 'A short title of the parameter.',
                type: 'string',
              },
              description: {
                title: 'Parameter description',
                description: 'A description of the parameter.',
                type: 'string',
              },
              type: {
                title: 'Parameter type',
                description: 'The type of the parameter.',
                type: 'string',
                enum: ['string'],
              },
              validation: {
                title: 'Parameter validation rules',
                description: 'The validation rules of the parameter. If not specified, no validation is applied.',
                type: 'object',
                properties: {
                  required: {
                    title: 'Specify if the parameter is required or not.',
                    description:
                      'Specify if the parameter is required to run the action. If not specified, the input parameter is optional.',
                    type: 'boolean',
                  },
                },
              },
            },
            required: ['key', 'title', 'type'],
          },
          ActionRunRequest: {
            type: 'object',
            properties: {
              input: {
                title: 'Action input',
                description:
                  'All the user input for the action to run. This is a flat object with key-value pairs. The key must match the input parameter key of the action. The value must be a string. If the input parameter is optional, you can omit the key-value pair. If the input parameter is required, you must provide the key-value pair.',
                type: 'object',
              },
            },
            required: ['input'],
          },
          ActionRunResponse: {
            type: 'object',
            properties: {
              status: {
                title: 'Status of the action run',
                description: 'The status of the action run.',
                type: 'string',
                enum: ['success'],
              },
              data: {
                type: 'object',
                properties: {
                  output: {
                    title: 'Action output',
                    description:
                      'The output of the action run. This is a flat object with key-value pairs. Every key-value pair is a separate output parameter of the action.',
                    type: 'object',
                    properties: {},
                  },
                },
                required: ['output'],
              },
            },
            required: ['status', 'data'],
          },
        },
        responses: {
          ErrorResponse: {
            description: 'Error Response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      title: 'Status of the response',
                      description: 'The status of the response.',
                      type: 'string',
                      enum: ['error'],
                    },
                    error: {
                      title: 'Error object',
                      description: 'The error object.',
                      type: 'object',
                      properties: {
                        message: {
                          title: 'Error message',
                          description: 'The error message to display to the user.',
                          type: 'string',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    return openApiSchema;
  }
}

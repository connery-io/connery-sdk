import { Injectable } from '@nestjs/common';
import { OpenAPIV3 } from 'openapi-types';
import { OpenAiFunctionSchema } from '../../types/llm.js';
import { ConfigService } from '@nestjs/config';
import { PluginService } from './plugin.service.js';

interface ExtendedOperationObject extends OpenAPIV3.OperationObject {
  // This custom extension property is used by OpenAI Actions to determine if the action requires a confirmation before running.
  // See more details here: https://platform.openai.com/docs/actions/consequential-flag
  'x-openai-isConsequential'?: boolean;
}

// TODO
@Injectable()
export class OpenAiSpecsService {
  constructor(private configService: ConfigService, private pluginService: PluginService) {}

  // TODO
  getOpenApiSpec(): OpenAPIV3.Document {
    // TODO: move to centralized config and validate on startup
    const publicUrl = this.configService.get<string>('PUBLIC_URL');
    if (!publicUrl) {
      throw new Error('The PUBLIC_URL environment variable is not defined.');
    }

    // This OpenAPI specification describes only the necessary minimum required for OpenAI GPTs to work.
    // Not all the parameters and responses are described here.
    const openApiSchema: OpenAPIV3.Document = {
      openapi: '3.0.0',
      info: {
        title: 'OpenAPI Specification for Connery actions', // TODO update
        description: 'This is the OpenAPI Specification actions available on the Connery runner.', // TODO update
        version: '1.0.0', // TODO: update
      },
      externalDocs: {
        url: 'https://docs.connery.io',
      },
      servers: [
        {
          description: 'Runner URL',
          url: publicUrl,
        },
      ],
      paths: {
        '/v1/actions': {
          get: {
            operationId: 'listActions',
            summary: 'List available actions',
            description:
              'List all available actions. If the user asks for the action you can not find in the list or you encounter an error by running the action, try refreshing this list to get the latest actions and try again.',
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
            title: 'Action list response',
            description: 'Action list response.',
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
            title: 'Input parameter object',
            description: 'Input parameter object.',
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
                    title: 'Specifies if the parameter is required or not',
                    description:
                      'Specifies if the parameter is required to run the action. If not specified, the input parameter is optional.',
                    type: 'boolean',
                  },
                },
              },
            },
            required: ['key', 'title', 'type'],
          },
          ActionRunRequest: {
            title: 'Action run request',
            description: 'Action run request.',
            type: 'object',
            properties: {
              prompt: {
                title: 'Prompt',
                description:
                  'This is a plain English prompt with the input parameters to run the action. Provide as much detail as possible.',
                type: 'string',
              },
            },
            required: ['prompt'],
          },
          ActionRunResponse: {
            title: 'Action run response',
            description: 'Action run response.',
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
            description: 'Error response.',
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

  // TODO move schema to API types and Open API spec
  async getFunctionsSpec(): Promise<OpenAiFunctionSchema[]> {
    const openAiFunctions: OpenAiFunctionSchema[] = [];

    for (const action of this.pluginService.plugin.actions) {
      const openAiFunction: OpenAiFunctionSchema = {
        name: action.key,
        description: this.getDescription(action.title, action.description),
        parameters: {
          type: 'object',
          properties: {},
          required: [],
        },
      };

      for (const inputParameter of action.inputParameters) {
        openAiFunction.parameters.properties[inputParameter.key] = {
          type: 'string',
          description: this.getDescription(inputParameter.title, inputParameter.description),
        };

        if (inputParameter.validation?.required) {
          openAiFunction.parameters.required.push(inputParameter.key);
        }
      }

      openAiFunctions.push(openAiFunction);
    }

    return openAiFunctions;
  }

  private getDescription(title: string, description?: string): string {
    return description ? `${title}: ${description}` : title;
  }
}

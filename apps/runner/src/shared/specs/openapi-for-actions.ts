import { Inject, Injectable } from '@nestjs/common';
import { IPluginCache } from '../plugin-cache/plugin-cache.interface';
import { OpenAPIV3 } from 'openapi-types';
import { ActionRuntime } from 'lib';
import { IConfig } from '../config/config.interface';

interface ExtendedOperationObject extends OpenAPIV3.OperationObject {
  // This custom extension property is used by OpenAI Actions to determine if the action requires a confirmation before running.
  // See more details here: https://platform.openai.com/docs/actions/consequential-flag
  'x-openai-isConsequential'?: boolean;
}

@Injectable()
export class OpenApiForActions {
  private _openApiSchema: OpenAPIV3.Document;

  constructor(@Inject(IPluginCache) private pluginCache: IPluginCache, @Inject(IConfig) private config: IConfig) {
    this._openApiSchema = {
      openapi: '3.0.0',
      info: {
        title: 'OpenAPI Specification for Connery actions',
        description: 'This is the OpenAPI Specification actions available on the Connery runner.',
        version: '1.0.0',
      },
      servers: [],
      paths: {},
      externalDocs: {
        url: 'https://docs.connery.io',
      },
      components: {
        schemas: {},
        securitySchemes: {
          ApiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'x-api-key',
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
                    status: { type: 'string' },
                    error: {
                      type: 'object',
                      properties: {
                        message: { type: 'string' },
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
  }

  async getOpenApiSchema(): Promise<OpenAPIV3.Document> {
    // Set the public URL of the runner to the OpenAPI spec
    const runnerConfig = this.config.getRunnerConfig();
    if (!runnerConfig.publicUrl) {
      throw new Error('The CONNERY_RUNNER_PUBLIC_URL is not configured on the runner.');
    }
    this._openApiSchema.servers = [
      {
        description: 'Runner URL',
        url: runnerConfig.publicUrl,
      },
    ];

    // Add the actions to the OpenAPI spec
    const actions = await this.pluginCache.getActions();
    for (const action of actions) {
      this.addActionsToOpenAPISpec(action);
    }

    return this._openApiSchema;
  }

  private addActionsToOpenAPISpec(action: ActionRuntime): void {
    const actionOpenApiKey = action.definition.key;
    const path = `/v1/plugins/${action.plugin.key}/actions/${action.definition.key}/run`;

    const requestBody: OpenAPIV3.RequestBodyObject = {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: action.definition.inputParameters.reduce((accumulator, param) => {
              accumulator[param.key] = { type: param.type };
              return accumulator;
            }, {} as Record<string, OpenAPIV3.SchemaObject>),
            required: action.definition.inputParameters
              .filter((param) => param.validation?.required)
              .map((param) => param.key),
          },
        },
      },
    };

    const responses: OpenAPIV3.ResponsesObject = {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: action.definition.outputParameters.reduce((accumulator, param) => {
                accumulator[param.key] = { type: param.type };
                return accumulator;
              }, {} as Record<string, OpenAPIV3.SchemaObject>),
              required: action.definition.outputParameters
                .filter((param) => param.validation?.required)
                .map((param) => param.key),
            },
          },
        },
      },
      400: { $ref: '#/components/responses/ErrorResponse' },
      401: { $ref: '#/components/responses/ErrorResponse' },
      403: { $ref: '#/components/responses/ErrorResponse' },
      404: { $ref: '#/components/responses/ErrorResponse' },
      500: { $ref: '#/components/responses/ErrorResponse' },
    };

    const operation: ExtendedOperationObject = {
      operationId: actionOpenApiKey,
      summary: action.definition.title,
      description: action.definition.description,
      // For 'read' action type we set the 'x-openai-isConsequential' to false, otherwise we set it to true.
      // This mean that the 'read' actions will not require a user confirmation before running.
      // But all other action types (ceate, update delete) will require a user confirmation before running.
      'x-openai-isConsequential': action.definition.type !== 'read',
      requestBody,
      responses,
      security: [{ ApiKeyAuth: [] }],
    };

    this._openApiSchema.paths[path] = { post: operation };
  }
}

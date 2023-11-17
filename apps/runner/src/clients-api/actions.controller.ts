import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post, Query } from '@nestjs/common';
import { ILlm } from ':src/shared/llm/llm.interface';
import { ActionIdentifiedOutput, ActionNotIdentifiedOutput } from ':src/shared/llm/types';
import { ObjectResponse } from ':src/shared/types';
import { OpenApiForActions } from ':src/shared/openapi-for-actions';
import { OpenAiFucntionsForActions } from ':src/shared/openai-functions-for-actions';
import { IPluginCache } from ':src/shared/plugin-cache/plugin-cache.interface';

type IdentifyActionBody = {
  prompt: string;
};

@Controller()
export class ActionsController {
  constructor(
    @Inject(ILlm) private llm: ILlm,
    @Inject(OpenApiForActions) private openApiForActions: OpenApiForActions,
    @Inject(OpenAiFucntionsForActions) private openAiFucntionsForActions: OpenAiFucntionsForActions,
    @Inject(IPluginCache) private pluginCache: IPluginCache,
  ) {}

  // This endpoint is deprecated and will be removed in the future
  // TODO: Remove this endpoint once all the clients are updated to use the new one
  @Post('/actions/identify')
  async identifyActionV0(
    @Body() body: IdentifyActionBody,
  ): Promise<ObjectResponse<ActionIdentifiedOutput | ActionNotIdentifiedOutput>> {
    return this.identifyAction(body);
  }

  @Post('/v1/actions/identify')
  async identifyActionV1(
    @Body() body: IdentifyActionBody,
  ): Promise<ObjectResponse<ActionIdentifiedOutput | ActionNotIdentifiedOutput>> {
    return this.identifyAction(body);
  }

  @Get('/v1/actions/specs/openapi')
  async getActionsOpenApi(): Promise<any> {
    return this.openApiForActions.getOpenApiSchema();
  }

  @Get('/v1/actions/specs/openai-fucntions')
  async getOpenAiFunctionsSchemaForActions(): Promise<any> {
    return this.openAiFucntionsForActions.getOpenAiFunctionsSchema();
  }

  // NOTE: This is a temporary endpoint.
  // This endpoint resolves specActionKey (short hashed action key) to pluginKey and actionKey,
  // so that the client can use the Connery API usign the pluginKey and actionKey.
  // This is done becasue the OpenAI and OpenAPI specs have limitations for the action keys,
  // so we can not store the full action key (pluginKey/actionKey) in the specs.
  @Get('/v1/actions/specs/resolve-action-from-specs')
  async resolveActionFromSpecs(
    @Query('specActionKey') specActionKey: string,
  ): Promise<{ pluginKey: string; actionKey: string }> {
    if (!specActionKey) {
      throw new HttpException(`The query param 'specActionKey' is required.`, HttpStatus.BAD_REQUEST);
    }

    // At the moment we still use the actionKey as the specActionKey.
    // But this should be changed in the future as it's not scalable solution.
    // Expecially when we have the same actionKey in multiple plugins.
    // TODO: Change the specActionKey to be a short hashed action key.
    const action = await this.pluginCache.getAction(specActionKey);

    return {
      pluginKey: action.plugin.key,
      actionKey: action.definition.key,
    };
  }

  private async identifyAction(
    body: IdentifyActionBody,
  ): Promise<ObjectResponse<ActionIdentifiedOutput | ActionNotIdentifiedOutput>> {
    const result = await this.llm.identifyAction(body.prompt);

    return {
      status: 'success',
      data: result,
    };
  }
}

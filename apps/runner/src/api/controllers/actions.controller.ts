import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ILlm } from ':src/api/llm/llm.interface';
import { ActionIdentifiedOutput, ActionNotIdentifiedOutput, OpenAiFunctionSchema } from ':src/api/llm/types';
import {
  ActionResponseType,
  IdentifyActionRequest,
  ObjectResponse,
  PaginatedResponse,
  RunActionRequest,
  convertAction,
} from ':src/types/api-types';
import { OpenApiService } from ':src/api/openapi/openapi.service';
import { IOpenAI } from ':src/api/llm/openai.interface';
import { OpenAPIV3 } from 'openapi-types';
import { IPluginCache } from ':src/api/plugin-cache/plugin-cache.interface';
import { Public } from ':src/api/auth/auth.guard';
import { ActionOutput } from ':src/lib/types';

@Controller()
export class ActionsController {
  constructor(
    @Inject(IPluginCache) private pluginCache: IPluginCache,
    @Inject(ILlm) private llm: ILlm,
    @Inject(IOpenAI) private openAi: IOpenAI,
    @Inject(OpenApiService) private openApiService: OpenApiService,
  ) {}

  @Get('/v1/actions')
  async getActions(): Promise<PaginatedResponse<ActionResponseType>> {
    const actions = await this.pluginCache.getActions();

    return {
      status: 'success',
      data: actions.map(convertAction),
    };
  }

  @Get('/v1/actions/:actionId')
  async getAction(@Param('actionId') actionId: string): Promise<ObjectResponse<ActionResponseType>> {
    const action = await this.pluginCache.getAction(actionId);

    return {
      status: 'success',
      data: convertAction(action),
    };
  }

  @Post('/v1/actions/identify')
  async identifyAction(
    @Body() body: IdentifyActionRequest,
  ): Promise<ObjectResponse<ActionIdentifiedOutput | ActionNotIdentifiedOutput>> {
    const result = await this.llm.identifyAction(body.prompt);

    return {
      status: 'success',
      data: result,
    };
  }

  @Post('/v1/actions/:actionId/run')
  async runAction(
    @Param('actionId') actionId: string,
    @Body() body: RunActionRequest,
  ): Promise<ObjectResponse<ActionOutput>> {
    const action = await this.pluginCache.getAction(actionId);
    const identifiedInputFromPrompt = await this.llm.identifyActionInput(action, body.prompt);
    const result = await action.run(body.input, identifiedInputFromPrompt);

    return {
      status: 'success',
      data: result,
    };
  }

  @Public()
  @Get('/v1/actions/specs/openapi')
  async getActionsOpenApi(): Promise<OpenAPIV3.Document> {
    return this.openApiService.getOpenApiSpecForActions();
  }

  @Get('/v1/actions/specs/openai-functions')
  async getOpenAiFunctionsSchemaForActions(): Promise<OpenAiFunctionSchema[]> {
    return this.openAi.getOpenAiFunctionsSpec(true);
  }
}

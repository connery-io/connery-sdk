import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ILlm } from ':src/shared/llm/llm.interface';
import { ActionIdentifiedOutput, ActionNotIdentifiedOutput } from ':src/shared/llm/types';
import { ObjectResponse } from ':src/shared/types';
import { OpenApiForActions } from ':src/shared/openapi-for-actions';
import { OpenAiFucntionsForActions } from ':src/shared/openai-functions-for-actions';

type IdentifyActionBody = {
  prompt: string;
};

@Controller()
export class ActionsController {
  constructor(
    @Inject(ILlm) private llm: ILlm,
    @Inject(OpenApiForActions) private openApiForActions: OpenApiForActions,
    @Inject(OpenAiFucntionsForActions) private openAiFucntionsForActions: OpenAiFucntionsForActions,
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

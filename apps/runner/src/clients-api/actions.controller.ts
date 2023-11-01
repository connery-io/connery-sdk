import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ILlm } from ':src/shared/llm/llm.interface';
import { ActionIdentifiedOutput, ActionNotIdentifiedOutput } from ':src/shared/llm/types';
import { ObjectResponse } from ':src/shared/types';

@Controller('/v1/actions')
export class ActionsController {
  constructor(@Inject(ILlm) private llm: ILlm) {}

  @Post('/identify')
  async identifyAction(
    @Body() body: { prompt: string },
  ): Promise<ObjectResponse<ActionIdentifiedOutput | ActionNotIdentifiedOutput>> {
    const result = await this.llm.identifyAction(body.prompt);

    return {
      status: 'success',
      data: result,
    };
  }
}

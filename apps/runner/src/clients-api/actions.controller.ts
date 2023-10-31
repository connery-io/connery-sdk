import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ILlm } from ':src/shared/llm/llm.interface';
import { ActionIdentifiedOutput, ActionNotIdentifiedOutput } from ':src/shared/llm/types';
import { ObjectResponse } from ':src/shared/types';

@Controller('/actions')
export class ActionsController {
  constructor(private llm: ILlm) {}

  @Post('/identify')
  async identifyAction(
    @Body() body: { prompt: string },
  ): Promise<ObjectResponse<ActionIdentifiedOutput | ActionNotIdentifiedOutput>> {
    try {
      const result = await this.llm.identifyAction(body.prompt);

      return {
        status: 'success',
        data: result,
      };
    } catch (error: any) {
      // TODO: Replace with proper solution
      throw new HttpException(
        {
          status: 'error',
          error: {
            message: error.message,
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

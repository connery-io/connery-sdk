import { OpenAiService } from ':src/shared/openai.service';
import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import {
  ActionIdentifiedOutput,
  ActionNotIdentifiedOutput,
  ErrorResponse,
  ObjectResponse,
  IdentifyActionInput,
} from './types';

@Controller('/actions')
export class ActionsController {
  constructor(private openAiService: OpenAiService) {}

  @Post('/identify')
  async identifyAction(
    @Body() body: IdentifyActionInput,
  ): Promise<ObjectResponse<ActionIdentifiedOutput | ActionNotIdentifiedOutput> | ErrorResponse> {
    try {
      const result = await this.openAiService.identifyAction(body.prompt);

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

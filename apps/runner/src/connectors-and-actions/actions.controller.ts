import { OpenAiService } from ':src/shared/openai.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ObjectResponse, RunActionOutput, RunActionWithPromptInput } from './types';

@Controller('/v1/actions')
export class ActionsController {
  constructor(private openAiService: OpenAiService) {}

  @Post('/run')
  async runAction(@Body() body: RunActionWithPromptInput): Promise<ObjectResponse<RunActionOutput>> {
    const result = await this.openAiService.runAction(body.prompt);
    throw new Error('Not implemented');
    //return result;
  }
}

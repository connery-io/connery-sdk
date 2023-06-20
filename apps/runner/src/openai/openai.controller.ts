import { Body, Controller, Post } from '@nestjs/common';
import { RunInput } from './types';
import { OpenAiService } from './openai.service';

@Controller('/runner/openai/exposed')
export class OpenAiController {
  constructor(private openAiService: OpenAiService) {}

  @Post('/run')
  async run(@Body() body: RunInput) {
    const result = await this.openAiService.runAction(body.prompt);
    return result;
  }
}

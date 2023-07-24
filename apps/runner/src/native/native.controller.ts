import { Controller, Inject, Post } from '@nestjs/common';
import { Action } from ':src/shared/action';
import { RequestService } from ':src/shared/request.service';

@Controller('/runner/native/exposed/:repoOwner/:repoName/:repoBranch/:actionKey')
export class NativeController {
  constructor(@Inject('CURRENT_ACTION') private action: Action, private requestService: RequestService) {}

  @Post('/run')
  async run() {
    return await this.action.runAction(this.requestService.inputParameters);
  }
}

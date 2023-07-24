import { Inject, Injectable } from '@nestjs/common';
import { map } from 'lodash';
import { RunInput } from ':src/openai/types';
import { Action } from ':src/shared/action';
import { ConnectorsService } from ':src/shared/connectors.service';

Injectable();
export class MakeService {
  constructor(@Inject(ConnectorsService) private connectorsService: ConnectorsService) {}

  async getActions() {
    const actions = await this.connectorsService.getActions();

    return map(actions, (action: Action) => {
      return {
        value: action.key,
        label: action.schema.title,
      };
    });
  }

  async runAction(actionKey: string, inputParameters: RunInput) {
    const action = await this.connectorsService.getAction(actionKey);

    return await action.runAction(inputParameters);
  }

  async getInputMetadata(actionKey: string) {
    const action = await this.connectorsService.getAction(actionKey);

    return map(action.schema.inputParameters, (inputParameter) => {
      return {
        name: inputParameter.key,
        label: inputParameter.title,
        type: inputParameter.type === 'string' ? 'text' : inputParameter.type,
        required: !!inputParameter.validation.required,
        help: inputParameter.description,
      };
    });
  }

  async getOutputMetadata(actionKey: string) {
    const action = await this.connectorsService.getAction(actionKey);

    return map(action.schema.outputParameters, (outputParameter) => {
      return {
        name: outputParameter.key,
        label: outputParameter.title,
        type: outputParameter.type === 'string' ? 'text' : outputParameter.type,
      };
    });
  }
}

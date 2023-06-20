import { Injectable } from '@nestjs/common';
import { map } from 'lodash';
import { Connector } from '../shared/connector';
import { Action } from 'src/shared/action';

Injectable();
export class MakeService {
  constructor(private connector: Connector, private action: Action) {}

  get actions() {
    return map(this.connector.schema.actions, (action) => {
      return {
        value: action.key,
        label: action.title + (action.description ? ` - ${action.description}` : ''),
      };
    });
  }

  get inputMetadata() {
    return map(this.action.schema.inputParameters, (inputParameter) => {
      return {
        name: inputParameter.key,
        label: inputParameter.title,
        type: inputParameter.type === 'string' ? 'text' : inputParameter.type,
        required: !!inputParameter.validation.required,
        help: inputParameter.description,
      };
    });
  }

  get outputMetadata() {
    return map(this.action.schema.outputParameters, (outputParameter) => {
      return {
        name: outputParameter.key,
        label: outputParameter.title,
        type: outputParameter.type === 'string' ? 'text' : outputParameter.type,
      };
    });
  }
}

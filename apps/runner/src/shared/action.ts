import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InputParametersObject, OperationContext } from './types';
import { ActionSchemaType } from 'connector-schema';
import { Connector } from './connector';

@Injectable()
export class Action {
  constructor(private actionSchema: ActionSchemaType, private connector: Connector) {}

  get key(): string {
    return this.actionSchema.key;
  }

  get schema(): ActionSchemaType {
    return this.actionSchema;
  }

  async runAction(inputParameters: InputParametersObject): Promise<any> {
    this.checkIfRequiredInputsPresent(inputParameters);
    const operationContext = this.getOperationContext(inputParameters);

    try {
      return await this.schema.operation.handler(operationContext);
    } catch (error) {
      throw new HttpException(`[Connector execution error] ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private getOperationContext(inputParameters: InputParametersObject): OperationContext {
    return {
      connector: this.connector.schema,
      action: this.actionSchema,
      inputParameters: inputParameters,
      configurationParameters: this.connector.configurationParameters,
    };
  }

  private checkIfRequiredInputsPresent(inputParameters: InputParametersObject): void {
    const inputParametersSchema = this.schema.inputParameters;
    const inputParametersFromUser = inputParameters;

    inputParametersSchema.forEach((inputSchema) => {
      if (inputSchema.validation.required && !inputParametersFromUser[inputSchema.key]) {
        throw new HttpException(
          `Input parameter '${inputSchema.key}' is required but the value is empty or not provided.`,
          HttpStatus.BAD_REQUEST,
        );
      }
    });
  }
}

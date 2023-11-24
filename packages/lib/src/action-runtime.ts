import { ActionContext, ActionDefinition, InputParametersObject, OutputParametersObject } from '@connery-io/sdk';
import { ActionOutput } from './types';
import { PluginRuntime } from './plugin-runtime';
import {
  trimInput,
  validateExtraInputParameters,
  validateExtraOutputParameters,
  validateInputParameterTypes,
  validateOutputParameterTypes,
  validateRequiredInputParameters,
  validateRequiredOutputParameters,
} from './parameter-utils';
import { generateActionHashId } from './id-utils';

export class ActionRuntime {
  // We use ID to identify action across many plugins and make it shorter.
  private _id: string;

  constructor(private _actionDefinition: ActionDefinition, private _plugin: PluginRuntime) {
    this._id = generateActionHashId(_plugin.key, _actionDefinition.key);
  }

  get id(): string {
    return this._id;
  }

  get definition(): ActionDefinition {
    return this._actionDefinition;
  }

  get plugin(): PluginRuntime {
    return this._plugin;
  }

  async run(input: InputParametersObject | undefined): Promise<ActionOutput> {
    const trimmedInput = trimInput(input);
    this.validateInput(trimmedInput);

    const result: ActionOutput = {
      output: {},
      used: {
        actionId: this._id,
        input: trimmedInput,
      },
    };

    const actionContext = this.getActionContext(trimmedInput);
    try {
      result.output = await this._actionDefinition.operation.handler(actionContext);
    } catch (error: any) {
      console.error(JSON.stringify(error));
      throw new Error(`[Action execution error] ${error.message}`);
    }

    this.validateOutput(result.output);
    return result;
  }

  private getActionContext(input: InputParametersObject): ActionContext {
    return {
      inputParameters: input,
      configurationParameters: this._plugin.configurationParameters,
    };
  }

  private validateInput(input: InputParametersObject): void {
    const inputDefinitions = this._actionDefinition.inputParameters;

    validateRequiredInputParameters(inputDefinitions, input);
    validateInputParameterTypes(inputDefinitions, input);
    validateExtraInputParameters(inputDefinitions, input);
  }

  private validateOutput(output: OutputParametersObject): void {
    const outputDefinitions = this._actionDefinition.outputParameters;

    validateRequiredOutputParameters(outputDefinitions, output);
    validateOutputParameterTypes(outputDefinitions, output);
    validateExtraOutputParameters(outputDefinitions, output);
  }
}

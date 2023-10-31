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

export class ActionRuntime {
  constructor(private _actionDefinition: ActionDefinition, private _plugin: PluginRuntime) {}

  get definition(): ActionDefinition {
    return this._actionDefinition;
  }

  get plugin(): PluginRuntime {
    return this._plugin;
  }

  async run(input: InputParametersObject): Promise<ActionOutput> {
    const trimmedInput = trimInput(input);
    this.validateInput(trimmedInput);

    const result: ActionOutput = {
      output: {},
      used: {
        pluginKey: this._plugin.key,
        actionKey: this._actionDefinition.Key,
        inputParameters: trimmedInput,
      },
    };

    const actionContext = this.getActionContext(trimmedInput);
    try {
      result.output = await this._actionDefinition.Operation.Handler(actionContext);
    } catch (error: any) {
      console.error(JSON.stringify(error));
      throw new Error(`[Action execution error] ${error.message}`);
    }

    this.validateOutput(result.output);
    return result;
  }

  private getActionContext(input: InputParametersObject): ActionContext {
    return {
      InputParameters: input,
      ConfigurationParameters: this._plugin.configurationParameters,
    };
  }

  private validateInput(input: InputParametersObject): void {
    const inputDefinitions = this._actionDefinition.InputParameters;

    validateRequiredInputParameters(inputDefinitions, input);
    validateInputParameterTypes(inputDefinitions, input);
    validateExtraInputParameters(inputDefinitions, input);
  }

  private validateOutput(output: OutputParametersObject): void {
    const outputDefinitions = this._actionDefinition.OutputParameters;

    validateRequiredOutputParameters(outputDefinitions, output);
    validateOutputParameterTypes(outputDefinitions, output);
    validateExtraOutputParameters(outputDefinitions, output);
  }
}

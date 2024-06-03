import { validateInput } from './utils/input-utils.js';
import { validateOutput } from './utils/output-utils.js';
import { ActionContext, InputObject, OutputObject } from '../types/context.js';
import {
  ActionDefinition,
  InputParameterDefinition,
  OperationDefinition,
  OutputParameterDefinition,
} from '../types/definition.js';
import { ActionRuntime, PluginRuntime } from '../types/runtime.js';
import { RunActionResponse } from '../api/dto.js';

export class Action implements ActionRuntime {
  key: string;
  name: string;
  description?: string | undefined;
  type: 'create' | 'read' | 'update' | 'delete';
  inputParameters: InputParameterDefinition[];
  outputParameters: OutputParameterDefinition[];
  operation: OperationDefinition;
  plugin: PluginRuntime;

  constructor(definition: ActionDefinition, plugin: PluginRuntime) {
    this.key = definition.key;
    this.name = definition.name;
    this.description = definition.description;
    this.type = definition.type;
    this.inputParameters = definition.inputParameters;
    this.outputParameters = definition.outputParameters;
    this.operation = definition.operation;
    this.plugin = plugin;
  }

  async run(input: InputObject): Promise<RunActionResponse> {
    const trimmedInput = validateInput(this.inputParameters, input);

    const actionContext: ActionContext = {
      input: trimmedInput,
    };
    let output: OutputObject = {};
    try {
      output = await this.operation.handler(actionContext);
    } catch (error: any) {
      console.error(JSON.stringify(error));
      throw new Error(`[Action runtime error] ${error.message}`);
    }

    const trimmedOutput = validateOutput(this.outputParameters, output);
    return {
      output: trimmedOutput,
    };
  }
}

import {
  trimInput,
  validateConfigurationParameterTypes,
  validateExtraConfigurationParameters,
  validateExtraInputParameters,
  validateExtraOutputParameters,
  validateInputParameterTypes,
  validateNumberOfInputParameters,
  validateOutputParameterTypes,
  validateRequiredConfigurationParameters,
  validateRequiredInputParameters,
  validateRequiredOutputParameters,
} from './parameter-utils.js';
import { ActionContext, ConfigurationObject, InputObject, OutputObject } from '../types/context.js';
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
  title: string;
  description?: string | undefined;
  type: 'create' | 'read' | 'update' | 'delete';
  inputParameters: InputParameterDefinition[];
  outputParameters: OutputParameterDefinition[];
  operation: OperationDefinition;
  plugin: PluginRuntime;

  constructor(definition: ActionDefinition, plugin: PluginRuntime) {
    this.key = definition.key;
    this.title = definition.title;
    this.description = definition.description;
    this.type = definition.type;
    this.inputParameters = definition.inputParameters;
    this.outputParameters = definition.outputParameters;
    this.operation = definition.operation;
    this.plugin = plugin;
  }

  async run(
    input: InputObject,
    defaultConfiguration: ConfigurationObject | undefined,
    customConfiguration: ConfigurationObject | undefined,
  ): Promise<RunActionResponse> {
    const trimmedInput = this.validateInput(input);

    const configuration = this.resolveConfiguration(defaultConfiguration, customConfiguration);
    const trimmedConfiguration = this.validateConfiguration(configuration);

    const result: RunActionResponse = {
      output: {},
    };

    const actionContext = this.getActionContext(trimmedInput, trimmedConfiguration);
    try {
      result.output = await this.operation.handler(actionContext);
    } catch (error: any) {
      console.error(JSON.stringify(error));
      throw new Error(`[Action runtime error] ${error.message}`);
    }

    this.validateOutput(result.output);
    return result;
  }

  private validateInput(input: InputObject): InputObject {
    validateNumberOfInputParameters(input);
    const trimmedInput = trimInput(input);
    validateRequiredInputParameters(this.inputParameters, trimmedInput);
    validateInputParameterTypes(this.inputParameters, trimmedInput);
    validateExtraInputParameters(this.inputParameters, trimmedInput);

    return trimmedInput;
  }

  private validateConfiguration(configuration: ConfigurationObject): ConfigurationObject {
    // TODO: validate number of configuration parameters, trim

    validateRequiredConfigurationParameters(this.plugin.configurationParameters, configuration);
    validateConfigurationParameterTypes(this.plugin.configurationParameters, configuration);
    validateExtraConfigurationParameters(this.plugin.configurationParameters, configuration);

    return configuration;
  }

  private validateOutput(output: OutputObject): void {
    // TODO: validate number of configuration parameters, trim

    validateRequiredOutputParameters(this.outputParameters, output);
    validateOutputParameterTypes(this.outputParameters, output);
    validateExtraOutputParameters(this.outputParameters, output);
  }

  private getActionContext(input: InputObject, configuration: ConfigurationObject): ActionContext {
    return {
      input: input,
      configuration: configuration,
    };
  }

  private resolveConfiguration(
    defaultConfiguration: ConfigurationObject | undefined,
    customConfiguration: ConfigurationObject | undefined,
  ): ConfigurationObject {
    // The order of the spread operator is important here.
    // The custom configuration should override the default configuration.
    return {
      ...defaultConfiguration,
      ...customConfiguration,
    };
  }
}

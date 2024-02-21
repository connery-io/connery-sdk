import { ActionDefinition, PluginDefinition } from ':src/types/definition';
import { Context } from ':src/types/context';
import { ConfigurationParametersObject } from ':src/types/context';
import { ActionRuntime } from './action-runtime';
import {
  validateConfigurationParameterTypes,
  validateExtraConfigurationParameters,
  validateRequiredConfigurationParameters,
} from './parameter-utils';
import { validateActionDefinitions } from './plugin-definition-validation-utils';
import { generatePluginHashId } from './id-utils';

export class PluginRuntime {
  private _id: string | undefined;
  private _pluginKey: string | undefined;
  private _pluginDefinition: PluginDefinition | undefined;
  private _configurationParameters: ConfigurationParametersObject | undefined;

  private _actions: ActionRuntime[] | undefined = undefined;

  async init(
    pluginKey: string,
    pluginDefinition: PluginDefinition,
    configurationParameters: ConfigurationParametersObject,
  ): Promise<void> {
    this._id = generatePluginHashId(pluginKey);
    this._pluginKey = pluginKey;
    this._pluginDefinition = pluginDefinition;

    // Validate and save configuration parameters
    validateRequiredConfigurationParameters(pluginDefinition.configurationParameters, configurationParameters);
    validateConfigurationParameterTypes(pluginDefinition.configurationParameters, configurationParameters);
    validateExtraConfigurationParameters(pluginDefinition.configurationParameters, configurationParameters);
    this._configurationParameters = configurationParameters;

    // Resolve, validate, and save async actions
    const resolvedActionDefinitions = await this.resolveAndValidateActions(
      pluginDefinition.actions,
      configurationParameters,
    );
    this._pluginDefinition.actions = resolvedActionDefinitions;

    // Load actions to memory
    this._actions = resolvedActionDefinitions.map((actionDefinition) => new ActionRuntime(actionDefinition, this));
  }

  get id(): string {
    if (!this._id) {
      throw new Error('Plugin is not initialized.');
    }

    return this._id;
  }

  get key(): string {
    if (!this._pluginKey) {
      throw new Error('Plugin is not initialized.');
    }

    return this._pluginKey;
  }

  get definition(): PluginDefinition {
    if (!this._pluginDefinition) {
      throw new Error('Plugin is not initialized.');
    }

    return this._pluginDefinition;
  }

  get configurationParameters(): ConfigurationParametersObject {
    if (!this._configurationParameters) {
      throw new Error('Plugin is not initialized.');
    }

    return this._configurationParameters;
  }

  get actions(): ActionRuntime[] {
    if (!this._actions) {
      throw new Error('Plugin is not initialized.');
    }

    return this._actions;
  }

  getActionByKey(actionKey: string): ActionRuntime {
    if (!this._actions) {
      throw new Error('Plugin is not initialized.');
    }

    const action = this._actions.find((action) => action.definition.key === actionKey);

    if (!action) {
      throw new Error(`The action '${actionKey}' is not found in the '${this._pluginKey}' plugin.`);
    }

    return action;
  }

  private async resolveAndValidateActions(
    actions: ActionDefinition[] | ((context: Context) => Promise<ActionDefinition[]>),
    configurationParameters: ConfigurationParametersObject,
  ): Promise<ActionDefinition[]> {
    const resolvedActionDefinitions: ActionDefinition[] = [];

    if (typeof actions === 'function') {
      const context: Context = {
        configurationParameters: configurationParameters,
      };

      // Resolve async actions
      const resolvedActions = await actions(context);
      resolvedActionDefinitions.push(...resolvedActions);
    } else {
      resolvedActionDefinitions.push(...actions);
    }

    // Validate action definitions
    validateActionDefinitions(resolvedActionDefinitions);

    return resolvedActionDefinitions;
  }
}

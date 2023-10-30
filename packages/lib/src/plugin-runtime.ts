import { ActionDefinition, ConfigurationParametersObject, Context, PluginDefinition } from '@connery-io/sdk';
import { ActionRuntime } from './action-runtime';
import {
  validateConfigurationParameterTypes,
  validateExtraConfigurationParameters,
  validateRequiredConfigurationParameters,
} from './parameter-utils';
import { validateActionDefinitions } from './plugin-definition-validation-utils';

export class PluginRuntime {
  private _pluginKey: string | undefined;
  private _pluginDefinition: PluginDefinition | undefined;
  private _configurationParameters: ConfigurationParametersObject | undefined;

  private _actions: ActionRuntime[] | undefined = undefined;

  async init(
    pluginKey: string,
    pluginDefinition: PluginDefinition,
    configurationParameters: ConfigurationParametersObject,
  ): Promise<void> {
    this._pluginKey = pluginKey;
    this._pluginDefinition = pluginDefinition;

    // Validate and save configuration parameters
    validateRequiredConfigurationParameters(pluginDefinition.ConfigurationParameters, configurationParameters);
    validateConfigurationParameterTypes(pluginDefinition.ConfigurationParameters, configurationParameters);
    validateExtraConfigurationParameters(pluginDefinition.ConfigurationParameters, configurationParameters);
    this._configurationParameters = configurationParameters;

    // Resolve, validate, and save async actions
    const resolvedActionDefinitions = await this.resolveAndValidateActions(
      pluginDefinition.Actions,
      configurationParameters,
    );
    this._pluginDefinition.Actions = resolvedActionDefinitions;

    // Load actions to memory
    this._actions = resolvedActionDefinitions.map((actionDefinition) => new ActionRuntime(actionDefinition, this));
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

  getAction(actionKey: string): ActionRuntime {
    if (!this._actions) {
      throw new Error('Plugin is not initialized.');
    }

    const action = this._actions.find((action) => action.definition.Key === actionKey);

    if (!action) {
      throw new Error(`Action '${actionKey}' is not found in the '${this._pluginKey}' plugin.`);
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
        ConfigurationParameters: configurationParameters,
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

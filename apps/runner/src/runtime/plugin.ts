import { ConfigurationParameterDefinition, MaintainerDefinition, PluginDefinition } from ':src/types/definition';
import { ActionRuntime, PluginRuntime } from ':src/types/runtime';
import { Action } from './action';
import { validatePluginDefinition } from './plugin-definition-validation-utils';

export class Plugin implements PluginRuntime {
  title: string;
  description?: string | undefined;
  actions: ActionRuntime[];
  configurationParameters: ConfigurationParameterDefinition[];
  maintainers: MaintainerDefinition[];

  constructor(definition: PluginDefinition) {
    validatePluginDefinition(definition);
    // Throw exceptions if the plugin definition is invalid (custom)

    this.title = definition.title;
    this.description = definition.description;
    this.actions = definition.actions.map((actionDefinition) => new Action(actionDefinition, this));
    this.configurationParameters = definition.configurationParameters;
    this.maintainers = definition.maintainers;
  }

  findActionByKey(key: string): ActionRuntime | undefined {
    return this.actions.find((action) => action.key === key);
  }
}

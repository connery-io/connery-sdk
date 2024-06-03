import { PluginDefinition } from '../types/definition.js';
import { ActionRuntime, PluginRuntime } from '../types/runtime.js';
import { Action } from './action.js';
import { validatePluginDefinition } from './utils/plugin-definition-validation-utils.js';

export class Plugin implements PluginRuntime {
  name: string;
  description?: string | undefined;
  actions: ActionRuntime[];

  constructor(definition: PluginDefinition) {
    validatePluginDefinition(definition);
    // Throw exceptions if the plugin definition is invalid (custom)

    this.name = definition.name;
    this.description = definition.description;
    this.actions = definition.actions.map((actionDefinition) => new Action(actionDefinition, this));
  }

  findActionByKey(key: string): ActionRuntime | undefined {
    return this.actions.find((action) => action.key === key);
  }
}

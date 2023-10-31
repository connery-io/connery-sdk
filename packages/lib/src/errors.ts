export class PluginFileNotFoundError extends Error {
  pluginFilePath: string;

  constructor(pluginFilePath: string) {
    super(`The plugin file '${pluginFilePath}' is not found.`);

    this.name = 'PluginFileNotFound';
    this.pluginFilePath = pluginFilePath;

    Object.setPrototypeOf(this, PluginFileNotFoundError.prototype);
  }
}

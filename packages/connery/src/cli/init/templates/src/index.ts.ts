export default `import { PluginDefinition, startPluginServer } from 'connery';
import sampleAction from './actions/sampleAction.js';

const pluginDefinition: PluginDefinition = {
  title: '{{plugin.title}}',
  description: '{{plugin.description}}',
  actions: [sampleAction],
  configurationParameters: [],
  maintainers: [
    {
      name: '{{maintainer.name}}',
      email: '{{maintainer.email}}',
    },
  ],
};

startPluginServer(pluginDefinition);
`;

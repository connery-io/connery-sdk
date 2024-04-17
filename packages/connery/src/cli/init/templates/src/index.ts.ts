export default `import { PluginDefinition, setupPluginServer } from 'connery';
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

const handler = await setupPluginServer(pluginDefinition);
export default handler;
`;

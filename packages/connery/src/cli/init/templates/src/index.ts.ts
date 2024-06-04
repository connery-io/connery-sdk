export default `import { PluginDefinition, setupPluginServer } from 'connery';
import sampleAction from './actions/sampleAction.js';

const pluginDefinition: PluginDefinition = {
  name: '{{plugin.name}}',
  description: '{{plugin.description}}',
  actions: [sampleAction],
};

const handler = await setupPluginServer(pluginDefinition);
export default handler;
`;

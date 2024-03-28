export default `import { ActionDefinition, ActionContext, OutputObject } from 'connery';

const actionDefinition: ActionDefinition = {
  key: '{{key}}',
  title: '{{title}}',
  description: '{{description}}',
  type: '{{type}}',
  inputParameters: [],
  operation: {
    handler: handler,
  },
  outputParameters: [],
};
export default actionDefinition;

export async function handler({ input, configuration }: ActionContext): Promise<OutputObject> {
  // TODO: Implement the action logic.

  return {};
}
`;

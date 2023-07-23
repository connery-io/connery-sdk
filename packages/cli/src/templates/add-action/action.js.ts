const content = `module.exports = {
  key: "{{key}}",
  title: "{{title}}",
  description: "{{description}}",
  type: "{{type}}",
  inputParameters: [], // TODO: Add input parameters here.
  operation: {
    type: "js",
    handler,
  },
  outputParameters: [], // TODO: Add output parameters here.
};

async function handler({ inputParameters, configurationParameters }) {
  // TODO: Implement the action logic here.

  return {};
}
`;

export default content;

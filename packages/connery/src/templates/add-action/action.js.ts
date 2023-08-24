const content = `const action = {
  key: "{{key}}",
  title: "{{title}}",
  description: "{{description}}",
  type: "{{type}}",
  inputParameters: [], // TODO: Add input parameters.
  operation: {
    type: "js",
    handler,
  },
  outputParameters: [], // TODO: Add output parameters.
};

async function handler({ inputParameters, configurationParameters }) {
  
  // TODO: Implement the action logic.

  return {};
}

// Expose internal functions for unit testing in the test environment.
// Otherwise, export the action definition.
if (process.env.NODE_ENV === 'test') {
  module.exports = {
    handler,
  };
} else {
  module.exports = action;
}
`;

export default content;

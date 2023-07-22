const content = `// TODO: Remove this sample action when you add your own actions to the connector

module.exports = {
  key: "SampleAction",
  title: "Sample action",
  description:
    "A sample action that adds two numbers",
  type: "read",
  inputParameters: [
    {
      key: "Number1",
      title: "Number 1",
      description: "The first number to add",
      type: "string",
      validation: {
        required: true,
      },
    },
    {
      key: "Number2",
      title: "Number 2",
      description: "The second number to add",
      type: "string",
      validation: {
        required: true,
      },
    },
  ],
  operation: {
    type: "js",
    handler,
  },
  outputParameters: [
    {
      key: "Sum",
      title: "Sum",
      description: "The sum of the two numbers",
      type: "string",
      validation: {
        required: true,
      },
    },
  ],
};

async function handler({ inputParameters }) {
  const sum = Number(inputParameters.Number1) + Number(inputParameters.Number2);

  return {
    Sum: sum,
  };
}
`;

export default content;

const content = `const {{key}} = require('../actions/{{key}}');

// NOTE: You don't need to test whether the input parameters are provided and valid. 
// Connery Runner will handle that based on your action definition.
// So you only need to test the logic of your action here.

// TODO: Rename the test suite below to match your use case.
it('should verify if the {{key}} action works as expected', async () => {
    // arrange
    const inputParameters = {}; // TODO: Specify the input parameters here.

    // act
    const result = await {{key}}.operation.handler({ inputParameters });

    // assert
    // TODO: Uncomment the line below and specify the output parameter you want to test and the expected value.
    // expect(...).toBe(...);
});
`;

export default content;

const content = `const { handler } = require('../../actions/{{key}}');

// NOTE: You don't need to test whether the input parameters are provided and valid. 
// Connery Runner will handle that based on your action definition.
// So you only need to test the logic of your action here.

describe('handler()', () => {

    // TODO: Rename the test suite below to match your use case.
    it('should verify if the handler function works as expected', async () => {
        // TODO: Uncomment the line below and specify the input parameters for your test case.
        // const inputParameters = {};

        // TODO: Uncomment the line below to call the handler function.
        // const result = await handler({ inputParameters });

        // TODO: Uncomment the line below and specify the output parameter you want to test and the expected value.
        // expect(result).toEqual({});
    });
});
`;

export default content;

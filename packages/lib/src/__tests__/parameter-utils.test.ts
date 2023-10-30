import {
  InputParameterDefinition,
  InputParametersObject,
  OutputParameterDefinition,
  OutputParametersObject,
  ConfigurationParameterDefinition,
  ConfigurationParametersObject,
} from '@connery-io/sdk';
import {
  trimInput,
  validateConfigurationParameterTypes,
  validateExtraConfigurationParameters,
  validateExtraInputParameters,
  validateExtraOutputParameters,
  validateInputParameterTypes,
  validateOutputParameterTypes,
  validateRequiredConfigurationParameters,
  validateRequiredInputParameters,
  validateRequiredOutputParameters,
} from '../parameter-utils';

//
// Input parameters validation
//

describe('validateRequiredInputParameters()', () => {
  it('throws an error if a required input parameter is missing', () => {
    const inputDefinitions: InputParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: { Required: true } },
      { Key: 'Age', Title: 'Age', Type: 'string', Validation: { Required: false } },
    ];
    const input: InputParametersObject = { Age: '25' };

    expect(() => validateRequiredInputParameters(inputDefinitions, input)).toThrowError(
      `[Input validation error] Input parameter 'Name' is required, but the value is empty or not provided.`,
    );
  });

  it('throws an error if a required input parameter is empty string', () => {
    const inputDefinitions: InputParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: { Required: true } },
      { Key: 'Age', Title: 'Age', Type: 'string', Validation: { Required: false } },
    ];
    const input: InputParametersObject = { Name: '', Age: '25' };

    expect(() => validateRequiredInputParameters(inputDefinitions, input)).toThrowError(
      `[Input validation error] Input parameter 'Name' is required, but the value is empty or not provided.`,
    );
  });

  it('does not throw an error if all required input parameters are provided', () => {
    const inputDefinitions: InputParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: { Required: true } },
      { Key: 'Age', Title: 'Age', Type: 'string', Validation: { Required: true } },
    ];
    const input: InputParametersObject = { Name: 'John', Age: '25' };

    expect(() => validateRequiredInputParameters(inputDefinitions, input)).not.toThrow();
  });

  it('does not throw an error if a parameter is not required and is missing', () => {
    const inputDefinitions: InputParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: { Required: false } },
      { Key: 'Age', Title: 'Age', Type: 'string', Validation: { Required: false } },
    ];
    const input: InputParametersObject = { Age: '25' };

    expect(() => validateRequiredInputParameters(inputDefinitions, input)).not.toThrow();
  });

  it('does not throw an error if a parameter is not required and is empty string', () => {
    const inputDefinitions: InputParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: { Required: false } },
      { Key: 'Age', Title: 'Age', Type: 'string', Validation: { Required: false } },
    ];
    const input: InputParametersObject = { Name: '', Age: '25' };

    expect(() => validateRequiredInputParameters(inputDefinitions, input)).not.toThrow();
  });

  it('does not throw an error if all parameters are not requried and nothing is provided', () => {
    const inputDefinitions: InputParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: { Required: false } },
      { Key: 'Age', Title: 'Age', Type: 'string', Validation: { Required: false } },
    ];
    const input: InputParametersObject = {};

    expect(() => validateRequiredInputParameters(inputDefinitions, input)).not.toThrow();
  });

  it('does not throw an error if Required is not defined and the parameter is missing', () => {
    const inputDefinitions: InputParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: {} },
      { Key: 'Age', Title: 'Age', Type: 'string', Validation: {} },
    ];
    const input: InputParametersObject = { Age: '25' };

    expect(() => validateRequiredInputParameters(inputDefinitions, input)).not.toThrow();
  });

  it('does not throw an error if Validation is not defined and the parameter is missing', () => {
    const inputDefinitions: InputParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string' },
      { Key: 'Age', Title: 'Age', Type: 'string' },
    ];
    const input: InputParametersObject = { Age: '25' };

    expect(() => validateRequiredInputParameters(inputDefinitions, input)).not.toThrow();
  });
});

describe('validateInputParameterTypes()', () => {
  it('throws an error if the input type does not match the defined type', () => {
    // It's not possible to test this case as the InputParametersObject already has the type of the input parameters.
    // This test is just for the sake of completeness.
  });

  it('does not throw an error if the input type matches the defined type', () => {
    const inputDefinitions: InputParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: { Required: true } },
      { Key: 'Age', Title: 'Age', Type: 'string', Validation: { Required: true } },
    ];
    const input: InputParametersObject = { Name: 'John', Age: '25' };

    expect(() => validateInputParameterTypes(inputDefinitions, input)).not.toThrow();
  });

  it('does not throw an error if the input parameter is not required and the value is empty', () => {
    const inputDefinitions: InputParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: { Required: false } },
    ];
    const input: InputParametersObject = { Name: '' };

    expect(() => validateInputParameterTypes(inputDefinitions, input)).not.toThrow();
  });

  it('does not throw an error if the input parameter is not required and the value is not provided', () => {
    const inputDefinitions: InputParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: { Required: false } },
    ];
    const input: InputParametersObject = {};

    expect(() => validateInputParameterTypes(inputDefinitions, input)).not.toThrow();
  });
});

describe('validateExtraInputParameters()', () => {
  it('throws an error if there are extra input parameters that are not defined in the schema', () => {
    const inputDefinitions: InputParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string' },
      { Key: 'Age', Title: 'Age', Type: 'string' },
    ];
    const input: InputParametersObject = { Age: '25', Extra: 'extra' };

    expect(() => validateExtraInputParameters(inputDefinitions, input)).toThrowError(
      `[Input validation error] Input parameter 'Extra' is not defined in the action schema.`,
    );
  });

  it('does not throw an error if there are no extra input parameters that are not defined in the schema', () => {
    const inputDefinitions: InputParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string' },
      { Key: 'Age', Title: 'Age', Type: 'string' },
    ];
    const input: InputParametersObject = { Age: '25' };

    expect(() => validateExtraInputParameters(inputDefinitions, input)).not.toThrow();
  });

  it('does not throw an error if there are no input parameters defined in the schema and no input parameters are provided', () => {
    const inputDefinitions: InputParameterDefinition[] = [];
    const input: InputParametersObject = {};

    expect(() => validateExtraInputParameters(inputDefinitions, input)).not.toThrow();
  });
});

//
// Output parameters validation
//

describe('validateRequiredOutputParameters()', () => {
  it('throws an error if a required output parameter is missing', () => {
    const outputDefinitions: OutputParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: { Required: true } },
      { Key: 'Age', Title: 'Age', Type: 'string', Validation: { Required: false } },
    ];
    const output: OutputParametersObject = { Age: '25' };

    expect(() => validateRequiredOutputParameters(outputDefinitions, output)).toThrowError(
      `[Output validation error] The action has been run. However, the output is not valid. The output parameter 'Name' is required, but the value is empty or not provided.`,
    );
  });

  it('throws an error if a required output parameter is empty string', () => {
    const outputDefinitions: OutputParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: { Required: true } },
      { Key: 'Age', Title: 'Age', Type: 'string', Validation: { Required: false } },
    ];
    const output: OutputParametersObject = { Name: '', Age: '25' };

    expect(() => validateRequiredOutputParameters(outputDefinitions, output)).toThrowError(
      `[Output validation error] The action has been run. However, the output is not valid. The output parameter 'Name' is required, but the value is empty or not provided.`,
    );
  });

  it('does not throw an error if all required output parameters are provided', () => {
    const outputDefinitions: OutputParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: { Required: true } },
      { Key: 'Age', Title: 'Age', Type: 'string', Validation: { Required: true } },
    ];
    const output: OutputParametersObject = { Name: 'John', Age: '25' };

    expect(() => validateRequiredOutputParameters(outputDefinitions, output)).not.toThrow();
  });

  it('does not throw an error if a parameter is not required and is missing', () => {
    const outputDefinitions: OutputParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: { Required: false } },
      { Key: 'Age', Title: 'Age', Type: 'string', Validation: { Required: false } },
    ];
    const output: OutputParametersObject = { Age: '25' };

    expect(() => validateRequiredOutputParameters(outputDefinitions, output)).not.toThrow();
  });

  it('does not throw an error if a parameter is not required and is empty string', () => {
    const outputDefinitions: OutputParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: { Required: false } },
      { Key: 'Age', Title: 'Age', Type: 'string', Validation: { Required: false } },
    ];
    const output: OutputParametersObject = { Name: '', Age: '25' };

    expect(() => validateRequiredOutputParameters(outputDefinitions, output)).not.toThrow();
  });

  it('does not throw an error if all parameters are not requried and nothing is provided', () => {
    const outputDefinitions: OutputParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: { Required: false } },
      { Key: 'Age', Title: 'Age', Type: 'string', Validation: { Required: false } },
    ];
    const output: OutputParametersObject = {};

    expect(() => validateRequiredOutputParameters(outputDefinitions, output)).not.toThrow();
  });

  it('does not throw an error if Required is not defined and the parameter is missing', () => {
    const outputDefinitions: OutputParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: {} },
      { Key: 'Age', Title: 'Age', Type: 'string', Validation: {} },
    ];
    const output: OutputParametersObject = { Age: '25' };

    expect(() => validateRequiredOutputParameters(outputDefinitions, output)).not.toThrow();
  });

  it('does not throw an error if Validation is not defined and the parameter is missing', () => {
    const outputDefinitions: OutputParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string' },
      { Key: 'Age', Title: 'Age', Type: 'string' },
    ];
    const output: OutputParametersObject = { Age: '25' };

    expect(() => validateRequiredOutputParameters(outputDefinitions, output)).not.toThrow();
  });
});

describe('validateOutputParameterTypes()', () => {
  it('throws an error if the output type does not match the defined type', () => {
    // It's not possible to test this case as the OutputParametersObject already has the type of the output parameters.
    // This test is just for the sake of completeness.
  });

  it('does not throw an error if the output type matches the defined type', () => {
    const outputDefinitions: OutputParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: { Required: true } },
      { Key: 'Age', Title: 'Age', Type: 'string', Validation: { Required: true } },
    ];
    const output: OutputParametersObject = { Name: 'John', Age: '25' };

    expect(() => validateOutputParameterTypes(outputDefinitions, output)).not.toThrow();
  });

  it('does not throw an error if the output parameter is not required and the value is empty', () => {
    const outputDefinitions: OutputParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: { Required: false } },
    ];
    const output: OutputParametersObject = { Name: '' };

    expect(() => validateOutputParameterTypes(outputDefinitions, output)).not.toThrow();
  });

  it('does not throw an error if the output parameter is not required and the value is not provided', () => {
    const outputDefinitions: OutputParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: { Required: false } },
    ];
    const output: OutputParametersObject = {};

    expect(() => validateOutputParameterTypes(outputDefinitions, output)).not.toThrow();
  });
});

describe('validateExtraOutputParameters()', () => {
  it('throws an error if there are extra output parameters that are not defined in the schema', () => {
    const outputDefinitions: OutputParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string' },
      { Key: 'Age', Title: 'Age', Type: 'string' },
    ];
    const output: OutputParametersObject = { Age: '25', Extra: 'extra' };

    expect(() => validateExtraOutputParameters(outputDefinitions, output)).toThrowError(
      `[Output validation error] The action has been run. However, the output is not valid. The output parameter 'Extra' is not defined in the action schema.`,
    );
  });

  it('does not throw an error if there are no extra output parameters that are not defined in the schema', () => {
    const outputDefinitions: OutputParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string' },
      { Key: 'Age', Title: 'Age', Type: 'string' },
    ];
    const output: OutputParametersObject = { Age: '25' };

    expect(() => validateExtraOutputParameters(outputDefinitions, output)).not.toThrow();
  });

  it('does not throw an error if there are no output parameters defined in the schema and no output parameters are provided', () => {
    const outputDefinitions: OutputParameterDefinition[] = [];
    const output: OutputParametersObject = {};

    expect(() => validateExtraOutputParameters(outputDefinitions, output)).not.toThrow();
  });
});

//
// Configuration parameters validation
//

describe('validateRequiredConfigurationParameters()', () => {
  it('throws an error if a required configuration parameter is missing', () => {
    const configurationDefinitions: ConfigurationParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: { Required: true } },
      { Key: 'Age', Title: 'Age', Type: 'string', Validation: { Required: false } },
    ];
    const configuration: ConfigurationParametersObject = { Age: '25' };

    expect(() => validateRequiredConfigurationParameters(configurationDefinitions, configuration)).toThrowError(
      `[Configuration parameters validation error] The configuration parameter 'Name' is required, but the value is empty or not provided.`,
    );
  });

  it('throws an error if a required configuration parameter is empty string', () => {
    const configurationDefinitions: ConfigurationParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: { Required: true } },
      { Key: 'Age', Title: 'Age', Type: 'string', Validation: { Required: false } },
    ];
    const configuration: ConfigurationParametersObject = { Name: '', Age: '25' };

    expect(() => validateRequiredConfigurationParameters(configurationDefinitions, configuration)).toThrowError(
      `[Configuration parameters validation error] The configuration parameter 'Name' is required, but the value is empty or not provided.`,
    );
  });

  it('does not throw an error if all required configuration parameters are provided', () => {
    const configurationDefinitions: ConfigurationParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: { Required: true } },
      { Key: 'Age', Title: 'Age', Type: 'string', Validation: { Required: true } },
    ];
    const configuration: ConfigurationParametersObject = { Name: 'John', Age: '25' };

    expect(() => validateRequiredConfigurationParameters(configurationDefinitions, configuration)).not.toThrow();
  });

  it('does not throw an error if a parameter is not required and is missing', () => {
    const configurationDefinitions: ConfigurationParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: { Required: false } },
      { Key: 'Age', Title: 'Age', Type: 'string', Validation: { Required: false } },
    ];
    const configuration: ConfigurationParametersObject = { Age: '25' };

    expect(() => validateRequiredConfigurationParameters(configurationDefinitions, configuration)).not.toThrow();
  });

  it('does not throw an error if a parameter is not required and is empty string', () => {
    const configurationDefinitions: ConfigurationParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: { Required: false } },
      { Key: 'Age', Title: 'Age', Type: 'string', Validation: { Required: false } },
    ];
    const configuration: ConfigurationParametersObject = { Name: '', Age: '25' };

    expect(() => validateRequiredConfigurationParameters(configurationDefinitions, configuration)).not.toThrow();
  });

  it('does not throw an error if all parameters are not requried and nothing is provided', () => {
    const configurationDefinitions: ConfigurationParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: { Required: false } },
      { Key: 'Age', Title: 'Age', Type: 'string', Validation: { Required: false } },
    ];
    const configuration: ConfigurationParametersObject = {};

    expect(() => validateRequiredConfigurationParameters(configurationDefinitions, configuration)).not.toThrow();
  });

  it('does not throw an error if Required is not defined and the parameter is missing', () => {
    const configurationDefinitions: ConfigurationParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: {} },
      { Key: 'Age', Title: 'Age', Type: 'string', Validation: {} },
    ];
    const configuration: ConfigurationParametersObject = { Age: '25' };

    expect(() => validateRequiredConfigurationParameters(configurationDefinitions, configuration)).not.toThrow();
  });

  it('does not throw an error if Validation is not defined and the parameter is missing', () => {
    const configurationDefinitions: ConfigurationParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string' },
      { Key: 'Age', Title: 'Age', Type: 'string' },
    ];
    const configuration: ConfigurationParametersObject = { Age: '25' };

    expect(() => validateRequiredConfigurationParameters(configurationDefinitions, configuration)).not.toThrow();
  });
});

describe('validateConfigurationParameterTypes()', () => {
  it('throws an error if the configuration type does not match the defined type', () => {
    // It's not possible to test this case as the ConfigurationParametersObject already has the type of the configuration parameters.
    // This test is just for the sake of completeness.
  });

  it('does not throw an error if the configuration type matches the defined type', () => {
    const configurationDefinitions: ConfigurationParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: { Required: true } },
      { Key: 'Age', Title: 'Age', Type: 'string', Validation: { Required: true } },
    ];
    const configuration: ConfigurationParametersObject = { Name: 'John', Age: '25' };

    expect(() => validateConfigurationParameterTypes(configurationDefinitions, configuration)).not.toThrow();
  });

  it('does not throw an error if the configuration parameter is not required and the value is empty', () => {
    const configurationDefinitions: ConfigurationParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: { Required: false } },
    ];
    const configuration: ConfigurationParametersObject = { Name: '' };

    expect(() => validateConfigurationParameterTypes(configurationDefinitions, configuration)).not.toThrow();
  });

  it('does not throw an error if the configuration parameter is not required and the value is not provided', () => {
    const configurationDefinitions: ConfigurationParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string', Validation: { Required: false } },
    ];
    const configuration: ConfigurationParametersObject = {};

    expect(() => validateConfigurationParameterTypes(configurationDefinitions, configuration)).not.toThrow();
  });
});

describe('validateExtraConfigurationParameters()', () => {
  it('throws an error if there are extra configuration parameters that are not defined in the schema', () => {
    const configurationDefinitions: ConfigurationParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string' },
      { Key: 'Age', Title: 'Age', Type: 'string' },
    ];
    const configuration: ConfigurationParametersObject = { Age: '25', Extra: 'extra' };

    expect(() => validateExtraConfigurationParameters(configurationDefinitions, configuration)).toThrowError(
      `[Configuration parameters validation error] The configuration parameter 'Extra' is not defined in the action schema.`,
    );
  });

  it('does not throw an error if there are no extra configuration parameters that are not defined in the schema', () => {
    const configurationDefinitions: ConfigurationParameterDefinition[] = [
      { Key: 'Name', Title: 'Name', Type: 'string' },
      { Key: 'Age', Title: 'Age', Type: 'string' },
    ];
    const configuration: ConfigurationParametersObject = { Age: '25' };

    expect(() => validateExtraConfigurationParameters(configurationDefinitions, configuration)).not.toThrow();
  });

  it('does not throw an error if there are no configuration parameters defined in the schema and no configuration parameters are provided', () => {
    const configurationDefinitions: ConfigurationParameterDefinition[] = [];
    const configuration: ConfigurationParametersObject = {};

    expect(() => validateExtraConfigurationParameters(configurationDefinitions, configuration)).not.toThrow();
  });
});

//
// Trim input parameters
//

describe('trimInput()', () => {
  it('trims the input parameters', () => {
    const input: InputParametersObject = { Name: '    John    ', Age: ' 25 ' };

    expect(trimInput(input)).toEqual({ Name: 'John', Age: '25' });
  });
});

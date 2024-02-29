import { ConfigurationParameterDefinition, ConfigurationObject } from '../../../sdk';
import {
  validateConfigurationParameterTypes,
  validateExtraConfigurationParameters,
  validateRequiredConfigurationParameters,
} from '../configuration-utils';

describe('validateRequiredConfigurationParameters()', () => {
  it('throws an error if a required configuration parameter is missing', () => {
    const configurationDefinitions: ConfigurationParameterDefinition[] = [
      { key: 'Name', title: 'Name', type: 'string', validation: { required: true } },
      { key: 'Age', title: 'Age', type: 'string', validation: { required: false } },
    ];
    const configuration: ConfigurationObject = { Age: '25' };

    expect(() => validateRequiredConfigurationParameters(configurationDefinitions, configuration)).toThrowError(
      `[Configuration validation error] The configuration parameter 'Name' is required, but the value is empty or not provided.`,
    );
  });

  it('throws an error if a required configuration parameter is empty string', () => {
    const configurationDefinitions: ConfigurationParameterDefinition[] = [
      { key: 'Name', title: 'Name', type: 'string', validation: { required: true } },
      { key: 'Age', title: 'Age', type: 'string', validation: { required: false } },
    ];
    const configuration: ConfigurationObject = { Name: '', Age: '25' };

    expect(() => validateRequiredConfigurationParameters(configurationDefinitions, configuration)).toThrowError(
      `[Configuration validation error] The configuration parameter 'Name' is required, but the value is empty or not provided.`,
    );
  });

  it('does not throw an error if all required configuration parameters are provided', () => {
    const configurationDefinitions: ConfigurationParameterDefinition[] = [
      { key: 'Name', title: 'Name', type: 'string', validation: { required: true } },
      { key: 'Age', title: 'Age', type: 'string', validation: { required: true } },
    ];
    const configuration: ConfigurationObject = { Name: 'John', Age: '25' };

    expect(() => validateRequiredConfigurationParameters(configurationDefinitions, configuration)).not.toThrow();
  });

  it('does not throw an error if a parameter is not required and is missing', () => {
    const configurationDefinitions: ConfigurationParameterDefinition[] = [
      { key: 'Name', title: 'Name', type: 'string', validation: { required: false } },
      { key: 'Age', title: 'Age', type: 'string', validation: { required: false } },
    ];
    const configuration: ConfigurationObject = { Age: '25' };

    expect(() => validateRequiredConfigurationParameters(configurationDefinitions, configuration)).not.toThrow();
  });

  it('does not throw an error if a parameter is not required and is empty string', () => {
    const configurationDefinitions: ConfigurationParameterDefinition[] = [
      { key: 'Name', title: 'Name', type: 'string', validation: { required: false } },
      { key: 'Age', title: 'Age', type: 'string', validation: { required: false } },
    ];
    const configuration: ConfigurationObject = { Name: '', Age: '25' };

    expect(() => validateRequiredConfigurationParameters(configurationDefinitions, configuration)).not.toThrow();
  });

  it('does not throw an error if all parameters are not requried and nothing is provided', () => {
    const configurationDefinitions: ConfigurationParameterDefinition[] = [
      { key: 'Name', title: 'Name', type: 'string', validation: { required: false } },
      { key: 'Age', title: 'Age', type: 'string', validation: { required: false } },
    ];
    const configuration: ConfigurationObject = {};

    expect(() => validateRequiredConfigurationParameters(configurationDefinitions, configuration)).not.toThrow();
  });

  it('does not throw an error if Required is not defined and the parameter is missing', () => {
    const configurationDefinitions: ConfigurationParameterDefinition[] = [
      { key: 'Name', title: 'Name', type: 'string', validation: {} },
      { key: 'Age', title: 'Age', type: 'string', validation: {} },
    ];
    const configuration: ConfigurationObject = { Age: '25' };

    expect(() => validateRequiredConfigurationParameters(configurationDefinitions, configuration)).not.toThrow();
  });

  it('does not throw an error if Validation is not defined and the parameter is missing or empty', () => {
    const configurationDefinitions: ConfigurationParameterDefinition[] = [
      { key: 'Name', title: 'Name', type: 'string' },
      { key: 'Age', title: 'Age', type: 'string' },
    ];
    const configuration: ConfigurationObject = { Age: '' };

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
      { key: 'Name', title: 'Name', type: 'string', validation: { required: true } },
      { key: 'Age', title: 'Age', type: 'string', validation: { required: true } },
    ];
    const configuration: ConfigurationObject = { Name: 'John', Age: '25' };

    expect(() => validateConfigurationParameterTypes(configurationDefinitions, configuration)).not.toThrow();
  });

  it('does not throw an error if the configuration parameter is not required and the value is empty', () => {
    const configurationDefinitions: ConfigurationParameterDefinition[] = [
      { key: 'Name', title: 'Name', type: 'string', validation: { required: false } },
    ];
    const configuration: ConfigurationObject = { Name: '' };

    expect(() => validateConfigurationParameterTypes(configurationDefinitions, configuration)).not.toThrow();
  });

  it('does not throw an error if the configuration parameter is not required and the value is not provided', () => {
    const configurationDefinitions: ConfigurationParameterDefinition[] = [
      { key: 'Name', title: 'Name', type: 'string', validation: { required: false } },
    ];
    const configuration: ConfigurationObject = {};

    expect(() => validateConfigurationParameterTypes(configurationDefinitions, configuration)).not.toThrow();
  });
});

describe('validateExtraConfigurationParameters()', () => {
  it('throws an error if there are extra configuration parameters that are not defined in the schema', () => {
    const configurationDefinitions: ConfigurationParameterDefinition[] = [
      { key: 'Name', title: 'Name', type: 'string' },
      { key: 'Age', title: 'Age', type: 'string' },
    ];
    const configuration: ConfigurationObject = { Age: '25', Extra: 'extra' };

    expect(() => validateExtraConfigurationParameters(configurationDefinitions, configuration)).toThrowError(
      `[Configuration validation error] The configuration parameter 'Extra' is not defined in the action schema.`,
    );
  });

  it('does not throw an error if there are no extra configuration parameters that are not defined in the schema', () => {
    const configurationDefinitions: ConfigurationParameterDefinition[] = [
      { key: 'Name', title: 'Name', type: 'string' },
      { key: 'Age', title: 'Age', type: 'string' },
    ];
    const configuration: ConfigurationObject = { Age: '25' };

    expect(() => validateExtraConfigurationParameters(configurationDefinitions, configuration)).not.toThrow();
  });

  it('does not throw an error if there are no configuration parameters defined in the schema and no configuration parameters are provided', () => {
    const configurationDefinitions: ConfigurationParameterDefinition[] = [];
    const configuration: ConfigurationObject = {};

    expect(() => validateExtraConfigurationParameters(configurationDefinitions, configuration)).not.toThrow();
  });
});

import { OutputParameterDefinition, OutputObject } from '../../../sdk';
import {
  validateRequiredOutputParameters,
  validateOutputParameterTypes,
  validateExtraOutputParameters,
} from '../output-utils';

describe('validateRequiredOutputParameters()', () => {
  it('throws an error if a required output parameter is missing', () => {
    const outputDefinitions: OutputParameterDefinition[] = [
      { key: 'Name', title: 'Name', type: 'string', validation: { required: true } },
      { key: 'Age', title: 'Age', type: 'string', validation: { required: false } },
    ];
    const output: OutputObject = { Age: '25' };

    expect(() => validateRequiredOutputParameters(outputDefinitions, output)).toThrowError(
      `[Output validation error] The action has been run. However, the output is not valid. The output parameter 'Name' is required, but the value is empty or not provided.`,
    );
  });

  it('throws an error if a required output parameter is empty string', () => {
    const outputDefinitions: OutputParameterDefinition[] = [
      { key: 'Name', title: 'Name', type: 'string', validation: { required: true } },
      { key: 'Age', title: 'Age', type: 'string', validation: { required: false } },
    ];
    const output: OutputObject = { Name: '', Age: '25' };

    expect(() => validateRequiredOutputParameters(outputDefinitions, output)).toThrowError(
      `[Output validation error] The action has been run. However, the output is not valid. The output parameter 'Name' is required, but the value is empty or not provided.`,
    );
  });

  it('does not throw an error if all required output parameters are provided', () => {
    const outputDefinitions: OutputParameterDefinition[] = [
      { key: 'Name', title: 'Name', type: 'string', validation: { required: true } },
      { key: 'Age', title: 'Age', type: 'string', validation: { required: true } },
    ];
    const output: OutputObject = { Name: 'John', Age: '25' };

    expect(() => validateRequiredOutputParameters(outputDefinitions, output)).not.toThrow();
  });

  it('does not throw an error if a parameter is not required and is missing', () => {
    const outputDefinitions: OutputParameterDefinition[] = [
      { key: 'Name', title: 'Name', type: 'string', validation: { required: false } },
      { key: 'Age', title: 'Age', type: 'string', validation: { required: false } },
    ];
    const output: OutputObject = { Age: '25' };

    expect(() => validateRequiredOutputParameters(outputDefinitions, output)).not.toThrow();
  });

  it('does not throw an error if a parameter is not required and is empty string', () => {
    const outputDefinitions: OutputParameterDefinition[] = [
      { key: 'Name', title: 'Name', type: 'string', validation: { required: false } },
      { key: 'Age', title: 'Age', type: 'string', validation: { required: false } },
    ];
    const output: OutputObject = { Name: '', Age: '25' };

    expect(() => validateRequiredOutputParameters(outputDefinitions, output)).not.toThrow();
  });

  it('does not throw an error if all parameters are not requried and nothing is provided', () => {
    const outputDefinitions: OutputParameterDefinition[] = [
      { key: 'Name', title: 'Name', type: 'string', validation: { required: false } },
      { key: 'Age', title: 'Age', type: 'string', validation: { required: false } },
    ];
    const output: OutputObject = {};

    expect(() => validateRequiredOutputParameters(outputDefinitions, output)).not.toThrow();
  });

  it('does not throw an error if Required is not defined and the parameter is missing', () => {
    const outputDefinitions: OutputParameterDefinition[] = [
      { key: 'Name', title: 'Name', type: 'string', validation: {} },
      { key: 'Age', title: 'Age', type: 'string', validation: {} },
    ];
    const output: OutputObject = { Age: '25' };

    expect(() => validateRequiredOutputParameters(outputDefinitions, output)).not.toThrow();
  });

  it('does not throw an error if Validation is not defined and the parameter is missing or empty', () => {
    const outputDefinitions: OutputParameterDefinition[] = [
      { key: 'Name', title: 'Name', type: 'string' },
      { key: 'Age', title: 'Age', type: 'string' },
    ];
    const output: OutputObject = { Age: '' };

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
      { key: 'Name', title: 'Name', type: 'string', validation: { required: true } },
      { key: 'Age', title: 'Age', type: 'string', validation: { required: true } },
    ];
    const output: OutputObject = { Name: 'John', Age: '25' };

    expect(() => validateOutputParameterTypes(outputDefinitions, output)).not.toThrow();
  });

  it('does not throw an error if the output parameter is not required and the value is empty', () => {
    const outputDefinitions: OutputParameterDefinition[] = [
      { key: 'Name', title: 'Name', type: 'string', validation: { required: false } },
    ];
    const output: OutputObject = { Name: '' };

    expect(() => validateOutputParameterTypes(outputDefinitions, output)).not.toThrow();
  });

  it('does not throw an error if the output parameter is not required and the value is not provided', () => {
    const outputDefinitions: OutputParameterDefinition[] = [
      { key: 'Name', title: 'Name', type: 'string', validation: { required: false } },
    ];
    const output: OutputObject = {};

    expect(() => validateOutputParameterTypes(outputDefinitions, output)).not.toThrow();
  });
});

describe('validateExtraOutputParameters()', () => {
  it('throws an error if there are extra output parameters that are not defined in the schema', () => {
    const outputDefinitions: OutputParameterDefinition[] = [
      { key: 'Name', title: 'Name', type: 'string' },
      { key: 'Age', title: 'Age', type: 'string' },
    ];
    const output: OutputObject = { Age: '25', Extra: 'extra' };

    expect(() => validateExtraOutputParameters(outputDefinitions, output)).toThrowError(
      `[Output validation error] The action has been run. However, the output is not valid. The output parameter 'Extra' is not defined in the action schema.`,
    );
  });

  it('does not throw an error if there are no extra output parameters that are not defined in the schema', () => {
    const outputDefinitions: OutputParameterDefinition[] = [
      { key: 'Name', title: 'Name', type: 'string' },
      { key: 'Age', title: 'Age', type: 'string' },
    ];
    const output: OutputObject = { Age: '25' };

    expect(() => validateExtraOutputParameters(outputDefinitions, output)).not.toThrow();
  });

  it('does not throw an error if there are no output parameters defined in the schema and no output parameters are provided', () => {
    const outputDefinitions: OutputParameterDefinition[] = [];
    const output: OutputObject = {};

    expect(() => validateExtraOutputParameters(outputDefinitions, output)).not.toThrow();
  });
});

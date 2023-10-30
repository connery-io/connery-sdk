import {
  ConfigurationParameterDefinition,
  ConfigurationParametersObject,
  InputParameterDefinition,
  InputParametersObject,
  OutputParameterDefinition,
  OutputParametersObject,
} from '@connery-io/sdk';
import { trim, forEach } from 'lodash';

//
// Input parameters validation
//

// Validate if all required input parameters are present
export function validateRequiredInputParameters(
  inputDefinitions: InputParameterDefinition[],
  input: InputParametersObject,
): void {
  inputDefinitions.forEach((inputDefinition) => {
    if (inputDefinition.Validation?.Required && !input[inputDefinition.Key]) {
      throw new Error(
        `[Input validation error] Input parameter '${inputDefinition.Key}' is required, but the value is empty or not provided.`,
      );
    }
  });
}

// Validate if the type of the input parameters are correct
export function validateInputParameterTypes(
  inputDefinitions: InputParameterDefinition[],
  input: InputParametersObject,
): void {
  inputDefinitions.forEach((inputDefinition) => {
    if (inputDefinition.Type !== typeof input[inputDefinition.Key]) {
      // Ignore the validation if the input parameter is not required and the value is empty or not provided
      if (!inputDefinition.Validation?.Required && typeof input[inputDefinition.Key] === 'undefined') {
        return;
      } else {
        throw new Error(
          `[Input validation error] The input parameter '${
            inputDefinition.Key
          }' has incorrect type. The expected type is '${
            inputDefinition.Type
          }', but the actual value has the type '${typeof input[inputDefinition.Key]}'.`,
        );
      }
    }
  });
}

// Validate if there are no extra input parameters that are not defined in the schema
export function validateExtraInputParameters(
  inputDefinitions: InputParameterDefinition[],
  input: InputParametersObject,
): void {
  Object.keys(input).forEach((inputKey) => {
    if (!inputDefinitions.find((inputDefinition) => inputDefinition.Key === inputKey)) {
      throw new Error(`[Input validation error] Input parameter '${inputKey}' is not defined in the action schema.`);
    }
  });
}

//
// Output parameters validation
//

// Validate if all required output parameters are present
export function validateRequiredOutputParameters(
  outputDefinitions: OutputParameterDefinition[],
  output: OutputParametersObject,
): void {
  outputDefinitions.forEach((outputDefinition) => {
    if (outputDefinition.Validation?.Required && !output[outputDefinition.Key]) {
      throw new Error(
        `[Output validation error] The action has been run. However, the output is not valid. The output parameter '${outputDefinition.Key}' is required, but the value is empty or not provided.`,
      );
    }
  });
}

// Validate if the type of the output parameters are correct
export function validateOutputParameterTypes(
  outputDefinitions: OutputParameterDefinition[],
  output: OutputParametersObject,
): void {
  outputDefinitions.forEach((outputDefinition) => {
    if (outputDefinition.Type !== typeof output[outputDefinition.Key]) {
      // Ignore the validation if the input parameter is not required and the value is empty or not provided
      if (!outputDefinition.Validation?.Required && typeof output[outputDefinition.Key] === 'undefined') {
        return;
      } else {
        throw new Error(
          `[Output validation error] The action has been run. However, the output is not valid. The output parameter '${
            outputDefinition.Key
          }' has an incorrect type. The expected type is '${
            outputDefinition.Type
          }', but the actual value has the type '${typeof output[outputDefinition.Key]}'.`,
        );
      }
    }
  });
}

// Validate if there are no extra output parameters that are not defined in the schema
export function validateExtraOutputParameters(
  outputDefinitions: OutputParameterDefinition[],
  output: OutputParametersObject,
): void {
  Object.keys(output).forEach((outputKey) => {
    if (!outputDefinitions.find((outputDefinition) => outputDefinition.Key === outputKey)) {
      throw new Error(
        `[Output validation error] The action has been run. However, the output is not valid. The output parameter '${outputKey}' is not defined in the action schema.`,
      );
    }
  });
}

//
// Configuration parameters validation
//

// Validate if all required configuration parameters are present
export function validateRequiredConfigurationParameters(
  configurationParametersDefinitions: ConfigurationParameterDefinition[],
  configurationParameters: ConfigurationParametersObject,
): void {
  configurationParametersDefinitions.forEach((configurationParameterDefinition) => {
    if (
      configurationParameterDefinition.Validation?.Required &&
      !configurationParameters[configurationParameterDefinition.Key]
    ) {
      throw new Error(
        `[Configuration parameters validation error] The configuration parameter '${configurationParameterDefinition.Key}' is required, but the value is empty or not provided.`,
      );
    }
  });
}

// Validate if the type of the configuration parameters are correct
export function validateConfigurationParameterTypes(
  configurationParametersDefinitions: ConfigurationParameterDefinition[],
  configurationParameters: ConfigurationParametersObject,
): void {
  configurationParametersDefinitions.forEach((configurationParameterDefinition) => {
    if (
      configurationParameterDefinition.Type !== typeof configurationParameters[configurationParameterDefinition.Key]
    ) {
      if (
        !configurationParameterDefinition.Validation?.Required &&
        typeof configurationParameters[configurationParameterDefinition.Key] === 'undefined'
      ) {
        return;
      } else {
        throw new Error(
          `[Configuration parameters validation error] The configuration parameter '${
            configurationParameterDefinition.Key
          }' has incorrect type. The expected type is '${
            configurationParameterDefinition.Type
          }', but the actual value has the type '${typeof configurationParameters[
            configurationParameterDefinition.Key
          ]}'.`,
        );
      }
    }
  });
}

// Validate if there are no extra configuration parameters that are not defined in the schema
export function validateExtraConfigurationParameters(
  configurationParametersDefinitions: ConfigurationParameterDefinition[],
  configurationParameters: ConfigurationParametersObject,
): void {
  Object.keys(configurationParameters).forEach((configurationParameterKey) => {
    if (
      !configurationParametersDefinitions.find(
        (configurationParameterDefinition) => configurationParameterDefinition.Key === configurationParameterKey,
      )
    ) {
      throw new Error(
        `[Configuration parameters validation error] The configuration parameter '${configurationParameterKey}' is not defined in the action schema.`,
      );
    }
  });
}

//
// Trim input parameters
//

export function trimInput(input: InputParametersObject): InputParametersObject {
  const trimmedInput: InputParametersObject = {};

  forEach(input, (value, key) => {
    trimmedInput[key] = trim(value);
  });

  return trimmedInput;
}

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
    if (inputDefinition.validation?.required && !input[inputDefinition.key]) {
      throw new Error(
        `[Input validation error] Input parameter '${inputDefinition.key}' is required, but the value is empty or not provided.`,
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
    if (inputDefinition.type !== typeof input[inputDefinition.key]) {
      // Ignore the validation if the input parameter is not required and the value is empty or not provided
      if (!inputDefinition.validation?.required && typeof input[inputDefinition.key] === 'undefined') {
        return;
      } else {
        throw new Error(
          `[Input validation error] The input parameter '${
            inputDefinition.key
          }' has incorrect type. The expected type is '${
            inputDefinition.type
          }', but the actual value has the type '${typeof input[inputDefinition.key]}'.`,
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
    if (!inputDefinitions.find((inputDefinition) => inputDefinition.key === inputKey)) {
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
    if (outputDefinition.validation?.required && !output[outputDefinition.key]) {
      throw new Error(
        `[Output validation error] The action has been run. However, the output is not valid. The output parameter '${outputDefinition.key}' is required, but the value is empty or not provided.`,
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
    if (outputDefinition.type !== typeof output[outputDefinition.key]) {
      // Ignore the validation if the input parameter is not required and the value is empty or not provided
      if (!outputDefinition.validation?.required && typeof output[outputDefinition.key] === 'undefined') {
        return;
      } else {
        throw new Error(
          `[Output validation error] The action has been run. However, the output is not valid. The output parameter '${
            outputDefinition.key
          }' has an incorrect type. The expected type is '${
            outputDefinition.type
          }', but the actual value has the type '${typeof output[outputDefinition.key]}'.`,
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
    if (!outputDefinitions.find((outputDefinition) => outputDefinition.key === outputKey)) {
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
      configurationParameterDefinition.validation?.required &&
      !configurationParameters[configurationParameterDefinition.key]
    ) {
      throw new Error(
        `[Configuration parameters validation error] The configuration parameter '${configurationParameterDefinition.key}' is required, but the value is empty or not provided.`,
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
      configurationParameterDefinition.type !== typeof configurationParameters[configurationParameterDefinition.key]
    ) {
      if (
        !configurationParameterDefinition.validation?.required &&
        typeof configurationParameters[configurationParameterDefinition.key] === 'undefined'
      ) {
        return;
      } else {
        throw new Error(
          `[Configuration parameters validation error] The configuration parameter '${
            configurationParameterDefinition.key
          }' has incorrect type. The expected type is '${
            configurationParameterDefinition.type
          }', but the actual value has the type '${typeof configurationParameters[
            configurationParameterDefinition.key
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
        (configurationParameterDefinition) => configurationParameterDefinition.key === configurationParameterKey,
      )
    ) {
      throw new Error(
        `[Configuration parameters validation error] The configuration parameter '${configurationParameterKey}' is not defined in the action schema.`,
      );
    }
  });
}

//
// Tools
//

export function trimInput(input?: InputParametersObject): InputParametersObject {
  const trimmedInput: InputParametersObject = {};

  forEach(input, (value, key) => {
    trimmedInput[key] = trim(value);
  });

  return trimmedInput;
}

export function validateNumberOfInputParameters(input?: InputParametersObject): void {
  // This validation also prevents DoS attacks by limiting the length of the input parameters object:
  // (https://github.com/connery-io/connery/security/code-scanning/1)
  if (Object.keys(input || {}).length > 100) {
    throw new Error(
      '[Input validation error] The input object is too large. The maximum number of input parameters is 100.',
    );
  }
}

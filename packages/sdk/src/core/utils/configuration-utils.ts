import { ConfigurationObject, ConfigurationParameterDefinition } from '../../sdk';

//
// Validation
//

// TODO: test: if empty object in, empty object out
export function validateConfiguration(
  configurationDefinitions: ConfigurationParameterDefinition[],
  configuration: ConfigurationObject,
): ConfigurationObject {
  validateNumberOfConfigurationParameters(configuration);
  const trimmedConfiguration = trimConfiguration(configuration);
  validateRequiredConfigurationParameters(configurationDefinitions, configuration);
  validateConfigurationParameterTypes(configurationDefinitions, configuration);
  validateExtraConfigurationParameters(configurationDefinitions, configuration);
  return trimmedConfiguration;
}

// TODO: test
export function validateNumberOfConfigurationParameters(configuration?: ConfigurationObject): void {
  // This validation also prevents DoS attacks by limiting the length of the input parameters object:
  // (https://github.com/connery-io/connery/security/code-scanning/1)
  if (Object.keys(configuration || {}).length > 100) {
    throw new Error(
      '[Configuration validation error] The configuration object is too large. The maximum number of configuration parameters is 100.',
    );
  }
}

// Validate if all required configuration parameters are present
export function validateRequiredConfigurationParameters(
  configurationParametersDefinitions: ConfigurationParameterDefinition[],
  configurationParameters: ConfigurationObject,
): void {
  configurationParametersDefinitions.forEach((configurationParameterDefinition) => {
    if (
      configurationParameterDefinition.validation?.required &&
      !configurationParameters[configurationParameterDefinition.key]
    ) {
      throw new Error(
        `[Configuration validation error] The configuration parameter '${configurationParameterDefinition.key}' is required, but the value is empty or not provided.`,
      );
    }
  });
}

// Validate if the type of the configuration parameters are correct
export function validateConfigurationParameterTypes(
  configurationParametersDefinitions: ConfigurationParameterDefinition[],
  configurationParameters: ConfigurationObject,
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
          `[Configuration validation error] The configuration parameter '${
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
  configurationParameters: ConfigurationObject,
): void {
  Object.keys(configurationParameters).forEach((configurationParameterKey) => {
    if (
      !configurationParametersDefinitions.find(
        (configurationParameterDefinition) => configurationParameterDefinition.key === configurationParameterKey,
      )
    ) {
      throw new Error(
        `[Configuration validation error] The configuration parameter '${configurationParameterKey}' is not defined in the action schema.`,
      );
    }
  });
}

//
// Other
//

// TODO: test
export function trimConfiguration(configuration?: ConfigurationObject): ConfigurationObject {
  const trimmedConfiguration: ConfigurationObject = {};

  if (!configuration) {
    return trimmedConfiguration;
  }

  Object.keys(configuration).forEach((key) => {
    trimmedConfiguration[key] = configuration[key].trim();
  });

  return trimmedConfiguration;
}

// TODO: test
export function resolveConfiguration(
  defaultConfiguration: ConfigurationObject | undefined,
  customConfiguration: ConfigurationObject | undefined,
): ConfigurationObject {
  // The order of the spread operator is important here.
  // The custom configuration should override the default configuration.

  // TODO: if at least one parameter of the custom configuration is defined, the default configuration should be ignored completely to prevent potential security issues.
  // TODO: cover this with tests

  return {
    ...defaultConfiguration,
    ...customConfiguration,
  };
}

import { PluginLoader, getAction, parseAndValidateConnector, readConnectorDefinitionFileUsingImport } from 'lib';
import {
  logEmptyLine,
  logError,
  logErrorBody,
  logInfo,
  logSuccess,
  logQuestionSectionTitle,
  styleAnswer,
  styleError,
  styleQuestion,
  checkPluginFileExists,
} from './shared';
import { input, select } from '@inquirer/prompts';

export default async function (
  actionKey: string,
  options: { configurationParameters: string; inputParameters: string },
) {
  try {
    const pluginDefinitionPath = `${process.cwd()}/dist/plugin.js`;
    await checkPluginFileExists(pluginDefinitionPath);

    // Read connector definition file
    const pluginLoader = new PluginLoader(pluginDefinitionPath, '', {}); // TODO add _pluginKey and _configurationParametersObject parameters
    await pluginLoader.load();
    const pluginRuntime = pluginLoader.pluginRuntime;

    const showFastRunCommand =
      !actionKey || options.configurationParameters === '{}' || options.inputParameters == '{}';
    var configurationParameters = JSON.parse(options.configurationParameters);
    var inputParameters = JSON.parse(options.inputParameters);

    logEmptyLine();

    // Collect action key if not provided
    if (!actionKey) {
      actionKey = await select({
        message: styleQuestion('What action do you want to run?'),
        choices: pluginRuntime.Actions.map((action) => ({ name: action.Key, value: action.Key })),
      });

      logEmptyLine();
    }

    const action = pluginRuntime.GetAction(actionKey);

    // Collect configuration parameters if not provided
    if (Object.keys(configurationParameters).length === 0 && pluginRuntime.ConfigurationParameters.length > 0) {
      logQuestionSectionTitle('Specify configuration parameters for the connector');
      logEmptyLine();

      for (const configurationParameter of pluginRuntime.ConfigurationParameters) {
        configurationParameters[configurationParameter.Key] = await input({
          message: styleQuestion(configurationParameter.title, configurationParameter.key),
          transformer: styleAnswer,
          validate: (value: string) => {
            if (configurationParameter.validation?.required && value.trim() === '') {
              return styleError(`Configuration parameter is required`);
            }
            return true;
          },
        });
      }

      logEmptyLine();
    }

    // Collect input parameters if not provided
    if (Object.keys(inputParameters).length === 0 && actionSchema.inputParameters.length > 0) {
      logQuestionSectionTitle('Specify input parameters for the action');
      logEmptyLine();

      for (const inputParameter of actionSchema.inputParameters) {
        inputParameters[inputParameter.key] = await input({
          message: styleQuestion(inputParameter.title, inputParameter.key),
          transformer: styleAnswer,
          validate: (value: string) => {
            if (inputParameter.validation?.required && value.trim() === '') {
              return styleError(`Input parameter is required`);
            }
            return true;
          },
        });
      }
      logEmptyLine();
    }

    // Run the action
    const result = await actionSchema.operation.handler({
      configurationParameters,
      inputParameters,
    });

    logSuccess('Action is successfully executed with the following result');
    logInfo(JSON.stringify(result, null, 2));
    logEmptyLine();

    // If the bare command was used, show a note about how to run the action with parameters
    if (showFastRunCommand) {
      logInfo('HINT: You can run the action with all the data prefilled by using the following command');
      logEmptyLine();

      logInfo(
        `npx connery@latest run-action ${actionSchema.key} --configuration-parameters '${JSON.stringify(
          configurationParameters,
        )}' --input-parameters '${JSON.stringify(inputParameters)}'`,
      );
      logEmptyLine();
    }
  } catch (error: any) {
    logError('Error occurred while running action');
    logErrorBody(error.message);
    throw error;
  }
}

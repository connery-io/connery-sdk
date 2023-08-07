import { getAction, parseAndValidateConnector, readConnectorDefinitionFileUsingImport } from 'lib';
import {
  addEmptyLine,
  logError,
  logErrorBody,
  logInfo,
  logSuccess,
  logTitle,
  styleAnswer,
  styleError,
  styleQuestion,
} from './shared';
import { input, select } from '@inquirer/prompts';

export default async function (
  actionKey: string,
  options: { configurationParameters: string; inputParameters: string },
) {
  try {
    // Read connector definition file
    const connector = await readConnectorDefinitionFileUsingImport(`${process.cwd()}/index.js`);
    const connectorSchema = parseAndValidateConnector(connector);

    const showFastRunCommand =
      !actionKey || options.configurationParameters === '{}' || options.inputParameters == '{}';
    var configurationParameters = JSON.parse(options.configurationParameters);
    var inputParameters = JSON.parse(options.inputParameters);

    // Collect action key if not provided
    if (!actionKey) {
      addEmptyLine();

      actionKey = await select({
        message: styleQuestion('What action do you want to run?'),
        choices: connectorSchema.actions.map((action) => ({ name: action.key, value: action.key })),
      });
    }

    const actionSchema = getAction(connectorSchema, actionKey);

    // Collect configuration parameters if not provided
    if (Object.keys(configurationParameters).length === 0 && connectorSchema.configurationParameters.length > 0) {
      logTitle('Configuration parameters for the connector');

      for (const configurationParameter of connectorSchema.configurationParameters) {
        configurationParameters[configurationParameter.key] = await input({
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
    }

    // Collect input parameters if not provided
    if (Object.keys(inputParameters).length === 0 && actionSchema.inputParameters.length > 0) {
      logTitle('Input parameters for the action');

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
    }

    // Run the action
    const result = await actionSchema.operation.handler({ configurationParameters, inputParameters }); // TODO: add connector and action to the handler context

    logSuccess('Action is successfully executed with the following result');
    logInfo(JSON.stringify(result, null, 2));
    addEmptyLine();

    // If the bare command was used, show a note about how to run the action with parameters
    if (showFastRunCommand) {
      logTitle('NOTE: You can run the action with all the data prefilled by using the following command');
      logInfo(
        `npx connery run-action ${actionSchema.key} --configuration-parameters '${JSON.stringify(
          configurationParameters,
        )}' --input-parameters '${JSON.stringify(inputParameters)}'`,
      );
      addEmptyLine();
    }
  } catch (error: any) {
    logError('Error occurred while running action');
    logErrorBody(error.message);
    throw error;
  }
}

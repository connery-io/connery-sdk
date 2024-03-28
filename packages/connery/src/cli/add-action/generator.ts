import nodePlop from 'node-plop';
import { Project, PropertyAssignment, SyntaxKind } from 'ts-morph';
import { AddActionParameters } from './types.js';

import actionTemplate from './templates/action.ts.js';
import actionTestTemplate from './templates/action.test.ts.js';
import { logAdditionalData, logEmptyLine } from '../shared.js';

export async function addAction(parameters: AddActionParameters) {
  const plot = await nodePlop('');
  const generatorName = 'add-action';

  plot.setGenerator(generatorName, {
    description: 'Add action',
    actions: [
      {
        type: 'add',
        path: 'src/actions/{{key}}.ts',
        template: actionTemplate,
      },
      {
        type: 'add',
        path: 'test/actions/{{key}}.test.ts',
        template: actionTestTemplate,
      },
      {
        type: 'modify',
        path: 'src/index.ts',
        transform: (fileContents: any, answers: any) => {
          const project = new Project();
          const sourceFile = project.createSourceFile('tmp.ts', fileContents);

          // Add the new action import
          sourceFile.addImportDeclaration({
            moduleSpecifier: `./actions/${answers.key}.js`,
            defaultImport: answers.key,
          });

          const pluginDefinition = sourceFile.getVariableDeclaration('pluginDefinition');
          if (!pluginDefinition) {
            throw new Error("The 'pluginDefinition' variable is not found in the ./src/index.ts file.");
          }

          const pluginDefinitionInitializer = pluginDefinition.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression);
          if (!pluginDefinitionInitializer) {
            throw new Error("The 'pluginDefinition' is not an object.");
          }

          const actionsProperty = pluginDefinitionInitializer.getProperty('actions');
          if (!actionsProperty) {
            throw new Error("The 'actions' property is not found in the 'pluginDefinition' object.");
          }

          if (actionsProperty instanceof PropertyAssignment) {
            const actionsArrayLiteral = actionsProperty.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression);
            if (!actionsArrayLiteral) {
              throw new Error("The 'actions' property is not an array.");
            }

            const isAlreadyAdded = actionsArrayLiteral
              .getElements()
              .some((element) => element.getText() === answers.key);
            if (isAlreadyAdded) {
              throw new Error(
                `The action '${answers.key}' is already exists in the 'actions' array in the ./src/index.ts file.`,
              );
            }

            // Add the new action to the actions array
            actionsArrayLiteral.addElement(answers.key);
          } else {
            throw new Error(
              "The 'actions' should be a direct property of the 'pluginDefinition' object (like 'actions: [value]'), but it appears to be defined in a different manner.",
            );
          }

          return sourceFile.getFullText();
        },
      },
    ],
  });

  const generator = plot.getGenerator(generatorName);
  const results = await generator.runActions(parameters);

  if (results.changes.length > 0) {
    logEmptyLine();
    logAdditionalData('Changes made:');
    results.changes.forEach((change) => {
      logAdditionalData(`- ${change.type} ${change.path}`);
    });
  }

  if (results.failures.length) {
    throw new Error(
      results.failures.map((failure) => ` - ${failure.type} ${failure.path}: ${failure.error}`).join('\n'),
    );
  }
}

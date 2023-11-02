// @ts-ignore: Suppresses TS1479
import nodePlop from 'node-plop';

import actionTemplate from './templates/action.js.js';
import actionTestTemplate from './templates/action.test.js.js';

export type AddActionParameters = {
  key: string;
  title: string;
  description: string;
  type: string;
};

export async function addAction(parameters: AddActionParameters) {
  const plot = await nodePlop('');
  const generatorName = 'add-action';

  plot.setGenerator('add-action', {
    description: 'Add action',
    actions: [
      {
        type: 'add',
        path: 'actions/{{key}}.js',
        template: actionTemplate,
      },
      {
        type: 'add',
        path: 'tests/actions/{{key}}.test.js',
        template: actionTestTemplate,
      },
      {
        type: 'modify',
        path: 'index.js',
        pattern: /(^.*)/m, // Import the new action and att it to the first line of the file
        template: 'const {{key}} = require("./actions/{{key}}");\n$1',
      },
      {
        type: 'append',
        path: 'index.js',
        pattern: /(actions:\s*\[)/g, // Add the new action to the beginning of the actions array
        template: '\t\t{{key}},',
      },
      {
        type: 'modify',
        path: 'README.md',
        pattern: /(Description\s*\|\s*.*?\|(\r?\n))/g, // Add the new action to the beginning of the table
        template: '$1| [{{title}}](/actions/{{key}}.js) | {{description}} |\n',
      },
    ],
  });

  const generator = plot.getGenerator(generatorName);
  await generator.runActions(parameters);
}

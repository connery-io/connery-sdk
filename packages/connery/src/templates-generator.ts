import nodePlop from 'node-plop';

// init-repository
import readmeTemplate from './templates/init-repository/README.md';
import buildConnectorWorkflowTemplate from './templates/init-repository/.github/workflows/build-connector.yml';
import sampleActionTemplate from './templates/init-repository/actions/SampleAction.js.js';
import sampleActionTestTemplate from './templates/init-repository/tests/actions/SampleAction.test.js';
import packageJsonTemplate from './templates/init-repository/package.json';
import indexJsTemplate from './templates/init-repository/index.js';
import gitignoreTemplate from './templates/init-repository/.gitignore';
import licenseTemplate from './templates/init-repository/LICENSE';

// add-action
import actionTemplate from './templates/add-action/action.js';
import actionTestTemplate from './templates/add-action/action.test.js';

async function getGenerator(key: string) {
  const plot = await nodePlop('');

  //
  // Define generators
  //

  plot.setGenerator('init-repository', {
    description: 'Init repository',
    actions: [
      {
        type: 'add',
        path: '.github/workflows/build-connector.yml',
        template: buildConnectorWorkflowTemplate,
      },
      {
        type: 'add',
        path: 'actions/SampleAction.js',
        template: sampleActionTemplate,
      },
      {
        type: 'add',
        path: 'tests/actions/SampleAction.test.js',
        template: sampleActionTestTemplate,
      },
      {
        type: 'add',
        path: '.gitignore',
        template: gitignoreTemplate,
      },
      {
        type: 'add',
        path: 'index.js',
        template: indexJsTemplate,
      },
      {
        type: 'add',
        path: 'LICENSE',
        template: licenseTemplate,
      },
      {
        type: 'add',
        path: 'package.json',
        template: packageJsonTemplate,
      },
      {
        type: 'add',
        path: 'README.md',
        template: readmeTemplate,
      },
    ],
  });

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
        pattern: /(^.*)/m, // Modify the first line
        template: 'const {{key}} = require("./actions/{{key}}");\n$1',
      },
      {
        type: 'append',
        path: 'index.js',
        pattern: /(actions:\s*\[)/g, // Append the action to the beginning of the actions array
        template: '\t\t{{key}},',
      },
    ],
  });

  const generator = plot.getGenerator(key);
  return generator;
}

export type InitRepositoryType = {
  connector: {
    key: string;
    title: string;
    description: string;
  };
  author: {
    name: string;
    email: string;
  };
  year: number;
};

export async function initRepository(parameters: InitRepositoryType) {
  const generator = await getGenerator('init-repository');
  await generator.runActions(parameters);
}

export type AddActionType = {
  key: string;
  title: string;
  description: string;
  type: string;
};

export async function addAction(parameters: AddActionType) {
  const generator = await getGenerator('add-action');
  await generator.runActions(parameters);
}

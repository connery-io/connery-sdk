import nodePlop from 'node-plop';
import { InitRepositoryParameters } from './types.js';

import sampleActionTemplate from './templates/src/actions/sampleAction.ts.js';
import indexTemplate from './templates/src/index.ts.js';
import sampleActionTestTemplate from './templates/test/actions/sampleAction.test.ts.js';
import gitignoreTemplate from './templates/.gitignore.js';
import licenseTemplate from './templates/LICENSE.js';
import packageJsonTemplate from './templates/package.json.js';
import readmeTemplate from './templates/README.md.js';
import tsconfigTemplate from './templates/tsconfig.json.js';

export async function initRepository(parameters: InitRepositoryParameters) {
  const plot = await nodePlop('');
  const generatorName = 'init-repository';

  plot.setGenerator(generatorName, {
    description: 'Init repository',
    actions: [
      {
        type: 'add',
        path: 'src/actions/sampleAction.ts',
        template: sampleActionTemplate,
      },
      {
        type: 'add',
        path: 'src/index.ts',
        template: indexTemplate,
      },
      {
        type: 'add',
        path: 'test/actions/sampleAction.test.ts',
        template: sampleActionTestTemplate,
      },
      {
        type: 'add',
        path: '.gitignore',
        template: gitignoreTemplate,
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
      {
        type: 'add',
        path: 'tsconfig.json',
        template: tsconfigTemplate,
      },
    ],
  });

  const generator = plot.getGenerator(generatorName);
  await generator.runActions(parameters);
}

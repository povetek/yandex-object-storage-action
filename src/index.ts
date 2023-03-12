import { getInput, info as logger, setFailed } from '@actions/core';
import { resolve } from 'node:path';
import { Action } from './action.js';
import { IActionInputs } from './types.js';

const isClearEnabled = (value: string): boolean => value === 'true';

try {
  const inputs: IActionInputs = {
    accessKeyId: getInput('access-key-id', { required: true }),
    secretAccessKey: getInput('secret-access-key', { required: true }),
    bucket: getInput('bucket', { required: true }),
    folderPath: resolve(getInput('path', { required: true })),
    clear: isClearEnabled(getInput('clear', { required: false })),
  };

  const action = new Action(inputs, logger);
  await action.run();
} catch(error: any) {
  setFailed(`Action failed with error: ${error.message}`);
}

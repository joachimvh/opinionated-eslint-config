import type { OptionsConfig } from '@antfu/eslint-config';
import antfu, { GLOB_EXCLUDE } from '@antfu/eslint-config';
import { fileNames } from './fileNames';
import { general } from './general';
import { test } from './test';
import { typed } from './typed';
import { unicorn } from './unicorn';

// The default ignore list contains all `output` folders, which conflicts with our src/http/output folder
// See https://github.com/antfu/eslint-config/blob/7071af7024335aad319a91db41ce594ebc6a0899/src/globs.ts#L55
const index = GLOB_EXCLUDE.indexOf('**/output');
if (index < 0) {
  throw new Error('Could not update GLOB_EXCLUDE. Check if antfu changed how it handles ignores.');
}
GLOB_EXCLUDE.splice(index, 1);

// eslint-disable-next-line ts/promise-function-async
export function opinionated(antfuOptions?: OptionsConfig): ReturnType<typeof antfu> {
  let result = antfu(antfuOptions)
    .append(general)
    .append(unicorn)
    .append(fileNames);

  if (antfuOptions?.typescript) {
    // Using an override here so all the type settings are also applied correctly
    result = result.override('antfu/typescript/rules-type-aware', typed);
  }

  result = result.append({
    ...test,
    files: [ 'test/**/*.ts' ],
  })
    .override('antfu/jsonc/rules', {
      rules: {
        // Consistent with how we do it in code
        'jsonc/array-bracket-spacing': [ 'error', 'always', {
          singleValue: true,
          objectsInArrays: false,
          arraysInArrays: false,
        }],
      },
    })
    .append({
      // This is necessary to prevent filename checks caused by JSON being present in a README.
      files: [ '**/README.md/**' ],
      rules: {
        'unicorn/filename-case': 'off',
      },
    })
    .override('antfu/markdown/parser', {
      rules: {
        // We want to be able to use these in Markdown text
        'no-irregular-whitespace': 'off',
      },
    });

  return result;
}

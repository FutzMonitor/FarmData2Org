const { ESLint } = require('eslint');
const path = require('path');

/*
 * lint-staged provides the command for each pattern with an explicit
 * list of files.  If one of those files is ignored by .eslintignore
 * then eslint outputs a warning that it was asked to lint an ignored
 * file and the command fails.  The code below applies the .eslintignore
 * patterns to the list of files before passing them to eslint.
 *
 * This was adopted/adapted from:
 * https://stackoverflow.com/a/73818629
 */
const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint();
  const ignoredFiles = await Promise.all(
    files.map((file) => eslint.isPathIgnored(file))
  );
  const filteredFiles = files.filter((_, i) => !ignoredFiles[i]);
  return filteredFiles.join(' ');
};

/*
 * Construct a test command for each entrypoint .vue file that is staged.
 * The command will use a glob to run all e2e.cy.js tests in the
 * endpoint directory containing the .vue file.
 */
const getModuleTestsVue = (files) => {
  const testCommands = files.map((file) => {
    if (file.includes('/farm_fd2/')) {
      return (
        'test.bash --fd2 --e2e --dev --glob=' +
        '/modules/farm_fd2/src/entrypoints/' +
        path.basename(path.dirname(file)) +
        '/*.e2e.cy.js'
      );
    } else if (file.includes('/farm_fd2_examples/')) {
      return (
        'test.bash --examples --e2e --dev --glob=' +
        '/modules/farm_fd2_examples/src/entrypoints/' +
        path.basename(path.dirname(file)) +
        '/*.e2e.cy.js'
      );
    } else if (file.includes('/farm_fd2_school/')) {
      return (
        'test.bash --school --e2e --dev --glob=' +
        '/modules/farm_fd2_school/src/entrypoints/' +
        path.basename(path.dirname(file)) +
        '/*.e2e.cy.js'
      );
    } else {
      console.log('.vue file found in unrecognized module.');
      console.log(
        'All .vue files must be in fd2 or fd2_examples or fd2_school.'
      );
    }
  });

  return testCommands;
};

/*
 * Construct a test command for each entrypoint e2e.cy.js file that is staged.
 */
const getModuleTestsE2ECyJs = (files) => {
  const testCommands = files.map((file) => {
    if (file.includes('/farm_fd2/')) {
      return (
        'test.bash --fd2 --e2e --dev --glob=' +
        file.substring(file.indexOf('/modules'))
      );
    } else if (file.includes('/farm_fd2_examples/')) {
      return (
        'test.bash --examples --e2e --dev --glob=' +
        file.substring(file.indexOf('/modules'))
      );
    } else if (file.includes('/farm_fd2_school/')) {
      return (
        'test.bash --school --e2e --dev --glob=' +
        file.substring(file.indexOf('/modules'))
      );
    } else {
      console.log('.cy.js file found in unrecognized module.');
      console.log(
        'All .cy.js files must be in fd2 or fd2_examples or fd2_school.'
      );
    }
  });

  return testCommands;
};

/*
 * Construct a test command for each entrypoint lib.js file
 * that is staged.
 */
const getModuleTestsJs = (files) => {
  const testCommands = files.map((file) => {
    if (file.includes('/farm_fd2/')) {
      return (
        'test.bash --fd2 --unit --glob=' +
        '/modules/farm_fd2/src/entrypoints/' +
        path.basename(path.dirname(file)) +
        '/lib.*.unit.cy.js'
      );
    } else if (file.includes('/farm_fd2_examples/')) {
      return (
        'test.bash --examples --unit --glob=' +
        '/modules/farm_fd2_examples/src/entrypoints/' +
        path.basename(path.dirname(file)) +
        '/lib.*.unit.cy.js'
      );
    } else if (file.includes('/farm_fd2_school/')) {
      return (
        'test.bash --school --unit --glob=' +
        '/modules/farm_fd2_school/src/entrypoints/' +
        path.basename(path.dirname(file)) +
        '/lib.*.unit.cy.js'
      );
    } else {
      console.log('lib.js file found in unrecognized module.');
      console.log(
        'All lib.js files must be in fd2 or fd2_examples or fd2_school.'
      );
    }
  });

  return testCommands;
};

/*
 * Construct a test command for each entrypoint lib.*.unit.cy.js
 * file that is staged.
 */
const getModuleTestsUnitCyJs = (files) => {
  const testCommands = files.map((file) => {
    if (file.includes('/farm_fd2/')) {
      return (
        'test.bash --fd2 --unit --glob=' +
        file.substring(file.indexOf('/modules'))
      );
    } else if (file.includes('/farm_fd2_examples/')) {
      return (
        'test.bash --examples --unit --glob=' +
        file.substring(file.indexOf('/modules'))
      );
    } else if (file.includes('/farm_fd2_school/')) {
      return (
        'test.bash --school --unit --glob=' +
        file.substring(file.indexOf('/modules'))
      );
    } else {
      console.log('lib.*.unit.cy.js file found in unrecognized module.');
      console.log(
        'All lib.*.unit.cy.js files must be in fd2 or fd2_examples or fd2_school.'
      );
    }
  });

  return testCommands;
};

/*
 * Construct a test command for each component .vue file that is staged.
 * The command will use a glob to run all comp.cy.js component tests in the
 * component directory containing the .vue file.
 */
const getCompTestsVue = (files) => {
  const testCommands = files.map((file) => {
    return (
      'test.bash --comp --glob=' +
      '/components/' +
      path.basename(path.dirname(file)) +
      '/*.comp.cy.js'
    );
  });

  return testCommands;
};

/*
 * Construct a test command for each component comp.cy.js file that is staged.
 */
const getCompTestsCompCyJs = (files) => {
  const testCommands = files.map((file) => {
    return (
      'test.bash --comp --glob=' + file.substring(file.indexOf('/components'))
    );
  });

  return testCommands;
};

/*
 * Construct a test command for each library .js file that is staged.
 * The command will use a glob to run all unit.cy.js unit tests in the
 * library directory containing the .js file.
 */
const getLibTestsJs = (files) => {
  const testCommands = files.map((file) => {
    return (
      'test.bash --unit --lib --glob=' +
      '/library/' +
      path.basename(path.dirname(file)) +
      '/*.unit.cy.js'
    );
  });

  return testCommands;
};

/*
 * Construct a test command for each library unit.cy.js file that is staged.
 */
const getLibTestsUnitCyJs = (files) => {
  const testCommands = files.map((file) => {
    return (
      'test.bash --unit --lib --glob=' +
      file.substring(file.indexOf('/library'))
    );
  });

  return testCommands;
};

module.exports = {
  '*': [
    'cspell --no-progress --no-summary --no-must-find-files --config .cspell.json',
    'prettier --ignore-unknown --write',
  ],
  '**/*.bash|.githooks/*': [
    'shellcheck',
    'shfmt --write --indent 2 --space-redirects',
  ],
  '**/*.md': 'markdown-link-check --config .markdown-link-check.json --quiet',
  '*.vue|*.js|*.jsx|*.cjs|*.mjs|*.json|*.md': async (files) => {
    const filesToLint = await removeIgnoredFiles(files);
    return [`eslint --max-warnings=0 ${filesToLint}`];
  },
  'modules/**/entrypoints/**/*.vue': (files) => {
    return getModuleTestsVue(files);
  },
  'modules/**/entrypoints/**/*.e2e.cy.js': (files) => {
    return getModuleTestsE2ECyJs(files);
  },
  'modules/**/entrypoints/**/lib.js': (files) => {
    return getModuleTestsJs(files);
  },
  'modules/**/entrypoints/**/lib.*.unit.cy.js': (files) => {
    return getModuleTestsUnitCyJs(files);
  },
  'components/**/*.vue': (files) => {
    return getCompTestsVue(files);
  },
  'components/**/*.comp.cy.js': (files) => {
    return getCompTestsCompCyJs(files);
  },
  'library/!(cypress)/!(*unit.cy).js': (files) => {
    return getLibTestsJs(files);
  },
  'library/**/*.unit.cy.js': (files) => {
    return getLibTestsUnitCyJs(files);
  },
};

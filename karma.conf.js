/* eslint-disable import/no-extraneous-dependencies */
const createDefaultConfig = require('@open-wc/testing-karma/default-config');
const merge = require('webpack-merge');

module.exports = config => {
  config.set(
      merge(createDefaultConfig(config), {
        files : [
          config.grep ? config.grep : 'packages/**/tests/*_test.js',
        ],
        preprocessors : {
          'packages/**/tests/*_test.js' : [ 'webpack', 'sourcemap' ],
          'packages/**/*.js': ['coverage']
        },
        failOnEmptyTestSuite : false,
        coverageIstanbulReporter: {
          reports: ['lcovonly'],
          thresholds: {
            emitWarning: true, // set to `true` to not fail the test command when thresholds are not met
            // thresholds for all files
            global: {
              statements: 70,
              lines: 70,
              branches: 70,
              functions: 70
            },
          }
        }
        // you can overwrite/extend the config further
      }),
  );
  return config;
};

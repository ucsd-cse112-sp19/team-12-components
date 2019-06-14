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
            emitWarning: true, // not fail test command when thresholds not met
            global: {
              statements: 75,
              lines: 75,
              branches: 75,
              functions: 75
            },
          }
        },
        client: {
          captureConsole: false // Turn off component logs.
        }
      }),
  );
  return config;
};
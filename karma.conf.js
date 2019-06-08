/* eslint-disable import/no-extraneous-dependencies */
const createDefaultConfig = require('@open-wc/testing-karma/default-config');
const merge = require('webpack-merge');

module.exports = config => {
  config.set(
      merge(createDefaultConfig(config), {
        files : [
          config.grep ? config.grep : 'packages/**/tests/*_test.js',
        ],
        reporters: ['coverage'],
        coverageReporter: {
          type : 'lcov',
          dir : 'coverage/'
        },
        preprocessors : {
          'packages/**/tests/*_test.js' : ['webpack', 'sourcemap'],
          'packages/**/*.js': 'coverage'
        },
        failOnEmptyTestSuite : false,

        // you can overwrite/extend the config further
      }),
  );
  return config;
};

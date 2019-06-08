/* eslint-disable import/no-extraneous-dependencies */
const createDefaultConfig = require('@open-wc/testing-karma/default-config');
const merge = require('webpack-merge');

module.exports = config => {
  config.set(
      merge(createDefaultConfig(config), {
        files : [
          config.grep ? config.grep : 'packages/**/tests/*_test.js',
        ],
        preprocessors : {'packages/**/tests/*_test.js' : [ 'webpack', 'sourcemap' ]},
        failOnEmptyTestSuite : false,
        reporters: ['progress', 'coverage-instanbul'],
        coverageIstanbulReporter: {
          reports: ['html', 'lcovonly', 'text-summary'],
          fixWebpackSourcePaths: true
        },

        // you can overwrite/extend the config further
      }),
  );
  return config;
};

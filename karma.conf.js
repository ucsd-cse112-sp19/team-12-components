/* eslint-disable import/no-extraneous-dependencies */
const createDefaultConfig = require('@open-wc/testing-karma/default-config');
const merge = require('webpack-merge');

module.exports = config => {
  config.set(
      merge(createDefaultConfig(config), {
        files : [
          // runs all files ending with .test in the test folder,
          // can be overwritten by passing a --grep flag. examples:
          //
          // npm run test -- --grep test/foo/bar.test.js
          // npm run test -- --grep test/bar/*
          // config.grep ? config.grep : 'test/*.js',
          config.grep ? config.grep : 'test/*/*.unit_test.js',
        ],
        preprocessors : {'test/**/*.unit_test.js' : [ 'webpack', 'sourcemap' ]},
        failOnEmptyTestSuite : false,

        // you can overwrite/extend the config further
      }),
  );
  return config;
};

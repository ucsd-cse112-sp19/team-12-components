# UCSD-Team12 Web Component Library

[![Build Status](https://travis-ci.com/ucsd-cse112/team-12-components.svg?branch=master)](https://travis-ci.com/ucsd-cse112/team-12-components)
[![Sauce Test Status](https://saucelabs.com/buildstatus/nonguyen)](https://saucelabs.com/u/nonguyen)
[![Visual Regression Testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/ucsd-cse112/ucsd-cse112)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/nonguyen.svg)](https://saucelabs.com/u/nonguyen)

[Unit Testing](#unit_test)  
[Doc generation](#doc)  
[Support Testing](#ack)  

## Setup
To initialize this repo for development, please run

`npm install`

Once you have installed all the dependencies, you may want to transpile our
webcomponents into es5 so that these component can be supported in older
browsers. To do so run

`npm run build`


## Contribute
We use clang-format for linting. If you are going to contribute please install clang-format. Below are some steps you can follow to install.

MacOS (install Homebrew):  

`$brew install clang-format`

Windows please follow this [guide](https://github.com/google/closure-library/wiki/Formatting-.js-with-clang-format)

## Unit Testing <a name="unit_test"></a>
**To run all tests:**  
npm run test

## Doc Generation <a name="doc"></a>
**To generate docs:**  
npm run doc

## Acknowledgement <a name="ack"></a>
We would like to thank [SauceLabs](https://saucelabs.com) for their support of open source projects like ours.

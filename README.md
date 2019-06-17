# UCSD-Team12 Web Component Library

[![Build Status](https://travis-ci.com/ucsd-cse112/team-12-components.svg?branch=master)](https://travis-ci.com/ucsd-cse112/team-12-components)
[![Sauce Test Status](https://saucelabs.com/buildstatus/nonguyen)](https://saucelabs.com/u/nonguyen)
[![Maintainability](https://api.codeclimate.com/v1/badges/d1fbf57bc7a51fcfdf09/maintainability)](https://codeclimate.com/github/ucsd-cse112/team-12-components/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d1fbf57bc7a51fcfdf09/test_coverage)](https://codeclimate.com/github/ucsd-cse112/team-12-components/test_coverage)
[![Visual Regression Testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/ucsd-cse112/ucsd-cse112)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/nonguyen.svg)](https://saucelabs.com/u/nonguyen)


[Documentation Website](https://ucsd-cse112.github.io/team-12-components/)

[Unit Testing](#unit_test)  
[Doc generation](#doc)  
[Support Testing](#ack)  

## Setup
To initialize this repo for development, please run

`npm install`

Once you have installed all the dependencies, you may want to transpile our
webcomponents into es5 so that these component can be supported in older
browsers. To do so run

We use clang-format for linting. If you are going to contribute please install clang-format. Below are some steps you can follow to install.

MacOS (install Homebrew):  

`$brew install clang-format`

Windows please follow this [guide](https://github.com/google/closure-library/wiki/Formatting-.js-with-clang-format)

`npm run build`

[Having issues?](https://www.google.com)

## Contribute
In order to contribute follow these steps:
1. Create a branch with a descriptive name. if you are working on a component name it and the branch "jj-{component name}"
2. Once finished with the ticket, push the commits to the branch.
3. Once all checks pass, create a pull request on github.
4. Once at least 2 people review and approve, squash and merge.

for a more information please read this [guide](https://docs.google.com/document/d/11Kemah4oEdHVMSQywa47FK737wfIK8SfjOFM9jGRG4k/edit?usp=sharing)

## File Structure
The main code for all the components are in the `packages` folder. 
All components contain:
1. `demo` folder, which holds the html that demos the component.
2. `test` folder, which holds a testcafe (`*_testcafe.js`_ and unit tests (`*_test.js`).
3. a `.js` file, which contains the core of the component. The are the files which our CDN points to.

The docs folder contains all of the documentation websites resources which includes the html, images, logos, js, css, etc.

The templates folder contains files that generate the website html files.

## Testing <a name="unit_test"></a>
**To run all tests (unit, functional):**  

`npm run test`

## Doc Generation <a name="doc"></a>
**To generate docs using JSDocs:**  

`npm run doc`

## External Doc (Website) Generation:
You will need to run two commands to create our documentation:

1. `node createDocs.js ./packages .js`

Once you run this command you can then run our generation script.

2.a `gulp compileComponents --option production` -- for production and hosting to our github sites.

2.b `gulp compileComponents --option dev` -- to test the documentation locally

## Acknowledgement <a name="ack"></a>
We would like to thank [SauceLabs](https://saucelabs.com) for their support of open source projects like ours.

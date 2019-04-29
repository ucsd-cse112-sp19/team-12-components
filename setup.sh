#!/bin/sh
# setup script that moves commit hook for code formatting to proper directory
# and sets up unit testing
cp scripts/pre-commit .git/hooks

# update npm
sudo npm i -g npm

# installs all needed packages for node.js (running unit tests etc..) based on package.json
npm install

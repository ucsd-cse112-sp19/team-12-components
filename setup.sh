#!/bin/sh
# Setup script that moves commit hook for code formatting to proper directory
cp scripts/pre-commit .git/hooks
# installs all needed packages for node.js (running unit tests etc..) based on package.json
npm install

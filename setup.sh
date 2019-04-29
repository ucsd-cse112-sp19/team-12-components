#!/bin/sh

set -e

# Setup script that moves commit hook for code formatting to proper directory
# and sets up unit testing
cp scripts/pre-commit .git/hooks
# ln -s scripts/pre-commit .git/hooks/pre-commit

# Clang installation 
npm install -g clang-format
# $ clang-format -i -style=llvm hw.js
# OR 
# $ clang-format --glob=hw.js

# $ clang-format -help

# update npm
sudo npm i -g npm

# installs all needed packages for node.js (running unit tests etc..) based on package.json
npm install

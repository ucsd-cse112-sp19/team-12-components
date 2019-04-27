#!/bin/sh
set -e

# Setup script that moves commit hook for code formatting to proper directory

cp scripts/pre-commit .git/hooks

# Clang installation 
npm install -g clang-format
# $ clang-format -i -style=llvm hw.js
# OR 
# $ clang-format --glob=hw.js

# $ clang-format -help

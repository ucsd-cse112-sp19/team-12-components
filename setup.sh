#!/bin/sh
# Setup script that moves commit hook for code formatting to proper directory

cp scripts/pre-commit .git/hooks
npm install

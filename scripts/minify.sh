#!/bin/bash
# must be ran in the root directory of repo
DIR="./packages/*"
FILES=`find $DIR -maxdepth 1 -type f -name '*.js' -exec basename {} \;`

for file in $FILES; do
    filename=${file%.js} # Get the name without .js extension
    #node ./node_modules/babel-minify/bin/minify.js packages/core-hello/core-hello.js --out-file input.min.js --mangle.keepClassName
    node ./node_modules/babel-minify/bin/minify.js packages/$filename/$file --out-file src/$file.min.js --mangle.keepClassName
    echo minified: $file into src/$file
done 

# Add all our new files to be commited
echo "git add src/"
git add src/

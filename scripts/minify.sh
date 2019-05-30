#!/bin/bash
# must be ran in the root directory of repo
DIR="./packages/*"
FILES=`find $DIR -maxdepth 1 -type f -name '*.js' -exec basename {} \;`
CAT_FILE="src/jj-components.min.js"

rm $CAT_FILE
touch $CAT_FILE

for file in $FILES; do
    filename=${file%.js} # Get the name without .js extension
    node ./node_modules/babel-minify/bin/minify.js packages/$filename/$file --out-file src/$filename.min.js --mangle.keepClassName
    cat src/$filename.min.js >> $CAT_FILE
    echo minified: $file into src/$file.min.js
done 

echo Building $CAT_FILE
node ./node_modules/babel-minify/bin/minify.js $CAT_FILE --out-file $CAT_FILE --mangle.keepClassName

# Add all our new files to be commited
echo "git add src/"
git add src/

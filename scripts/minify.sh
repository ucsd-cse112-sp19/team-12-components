
#!/bin/sh
# Minify script
# Takes all source .js files and compresses for CDN. Also make concatenated
# file jj-components.min.js which contains all the components.

# must be ran in the root directory of repo
ROOT_DIR=`git rev-parse --show-toplevel`
DIR="$ROOT_DIR/packages/*"
FILES=`find $DIR -maxdepth 1 -type f -name '*.js' -exec basename {} \;`
CAT_FILE="$ROOT_DIR/src/jj-components.min.js"

rm $CAT_FILE
touch $CAT_FILE

for file in $FILES; do
    filename=${file%.js} # Get the name without .js extension
    node $ROOT_DIR/node_modules/babel-minify/bin/minify.js $ROOT_DIR/packages/$filename/$file --out-file $ROOT_DIR/src/$filename.min.js --mangle.keepClassName
    cat $ROOT_DIR/src/$filename.min.js >> $CAT_FILE
    echo minified: $file into src/$file.min.js
done 

node $ROOT_DIR/node_modules/babel-minify/bin/minify.js $CAT_FILE --out-file $CAT_FILE --mangle.keepClassName

# Add all our new files to be commited
echo "git add $ROOT_DIR/src/"
git add $ROOT_DIR/src/

# Hello World
The hello world component is a simple web component that displays "hello" in
a language determined by which language it is currently in, followed by
"Shaya".

To initialize this repo for development, please run the setup.sh script once
after cloning.
    $ . ./setup.sh

The following files are included in this web component:
* helloworld.html
* hw.js
* main.css
* README.md

## Getting Started
To start this program, simply clone the repository and click on the html file,
which will display in a browser.


## Running the Tests



## Deployment


## Git Hooks
Git hooks are shells scripts that trigger when you perform a specific action
in git. They are useful for automating checks when moving through the workflow.
These git hooks can be set up for specific actions, e.g. to prevent a commit
if the message has not been formatted correctly. The git hooks exist as simple
text files in the .git/hooks directory. The result of the git hook can be
viewed in the Hook Log in order to see what caused the problem.

Hooks included:    
* pre-commit
* commit-msg

How to create a hook:
1. Navigate to the git hooks 
    $ cd /path-to-your-git-repo/.git/hooks
2. Create a custom hook
    $ touch hookName
3. Make the custom hook executable
    $ chmod +x hookName
4. Open the pre-commit script with text editor
    $ open -e hookName # mac OS
    $ gedit pre-commit # linux


## Clang Formatting 

node.js module which wraps the native clang-format executable. Ensuring that
the code is properly formatted is an important part of the development
workflow. Note that the check-clang-format and git-clang-format commands 
require Python to be globally available.
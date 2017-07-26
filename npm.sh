#!/bin/sh

# Set paths in npm helper scripts so child node processes can be spawned.

PATH="$PWD/node/":$PATH
node "node/node_modules/npm/bin/npm-cli.js" "$@"

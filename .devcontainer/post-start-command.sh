#!/bin/bash

# Restore project cache from the image
cp -r /connery-cache/project/* /workspaces/connery/

# Create .env file
./.devcontainer/create-dot-env.sh

# Use yarn cache from the image
yarn config set cache-folder /connery-cache/yarn/v6/

# Install dependencies
yarn install --prefer-offline

# Build project
yarn run build

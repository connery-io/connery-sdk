#!/bin/bash

# Create .env file
./.devcontainer/create-dot-env.sh

# Install dependencies
yarn install --prefer-offline

# Build project
yarn run build

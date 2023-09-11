#!/bin/bash

# Create .env file from .env.example
cp .env.example .env

# Add a comment to the top of the file
sed -i '1i\
# This file was created by ./.devcontainer/create-dot-env.sh script\
# The script also generated a random CONNERY_RUNNER_API_KEY which you can use to authenticate with the runner or you can set your own\
' .env

# Set CONNERY_RUNNER_API_KEY to a randomly generated value
sed -i "s/CONNERY_RUNNER_API_KEY=/CONNERY_RUNNER_API_KEY=$(openssl rand -hex 32)/g" .env

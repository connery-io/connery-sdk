#!/bin/bash

#
# Restore node_modules cache and create directories if they don't exist
#

# Root
mkdir -p /workspaces/connery/node_modules

cp -r /workspace/node_modules/* /workspaces/connery/node_modules/ || exit 1

# Apps
mkdir -p /workspaces/connery/apps/docs/node_modules
mkdir -p /workspaces/connery/apps/runner/node_modules


cp -r /workspace/apps/docs/node_modules/* /workspaces/connery/apps/docs/node_modules/ || exit 1
cp -r /workspace/apps/runner/node_modules/* /workspaces/connery/apps/runner/node_modules/ || exit 1

# Packages
mkdir -p /workspaces/connery/packages/connery/node_modules
mkdir -p /workspaces/connery/packages/eslint-config-custom/node_modules
mkdir -p /workspaces/connery/packages/lib/node_modules
mkdir -p /workspaces/connery/packages/tsconfig/node_modules

cp -r /workspace/packages/connery/node_modules/* /workspaces/connery/packages/connery/node_modules/ || exit 1
cp -r /workspace/packages/eslint-config-custom/node_modules/* /workspaces/connery/packages/eslint-config-custom/node_modules/ || exit 1
cp -r /workspace/packages/lib/node_modules/* /workspaces/connery/packages/lib/node_modules/ || exit 1
cp -r /workspace/packages/tsconfig/node_modules/* /workspaces/connery/packages/tsconfig/node_modules/ || exit 1

#
# Restore build artifacts cache
#

# docs

# runner

# connery

# eslint-config-custom

# lib

# tsconfig
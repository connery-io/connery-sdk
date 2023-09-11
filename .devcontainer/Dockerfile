#
# Build stage
#

FROM mcr.microsoft.com/devcontainers/typescript-node:18-bullseye as build-stage

WORKDIR /workspace

COPY package.json yarn.lock ./

COPY apps/docs/package.json ./apps/docs/package.json
COPY apps/runner/package.json ./apps/runner/package.json

COPY packages/connery/package.json ./packages/connery/package.json
COPY packages/eslint-config-custom/package.json ./packages/eslint-config-custom/package.json
COPY packages/lib/package.json ./packages/lib/package.json
COPY packages/tsconfig/package.json ./packages/tsconfig/package.json

RUN yarn install --frozen-lock-file --network-timeout 1000000 

COPY . .

RUN yarn run build

#
# Final stage
#
# Copy node_modules and build artifacts to prepre the cache image for the devcontainer
#

FROM mcr.microsoft.com/devcontainers/typescript-node:18-bullseye

WORKDIR /cache

# Root
COPY --from=build-stage /workspace/node_modules ./node_modules

# docs

COPY --from=build-stage /workspace/apps/docs/.docusaurus ./apps/docs/.docusaurus
COPY --from=build-stage /workspace/apps/docs/.turbo ./apps/docs/.turbo
COPY --from=build-stage /workspace/apps/docs/build ./apps/docs/build
COPY --from=build-stage /workspace/apps/docs/node_modules ./apps/docs/node_modules

# runner

COPY --from=build-stage /workspace/apps/runner/.turbo ./apps/runner/.turbo
COPY --from=build-stage /workspace/apps/runner/dist ./apps/runner/dist
COPY --from=build-stage /workspace/apps/runner/node_modules ./apps/runner/node_modules

# connery

COPY --from=build-stage /workspace/packages/connery/.turbo ./packages/connery/.turbo
COPY --from=build-stage /workspace/packages/connery/dist ./packages/connery/dist
COPY --from=build-stage /workspace/packages/connery/node_modules ./packages/connery/node_modules

# eslint-config-custom

COPY --from=build-stage /workspace/packages/eslint-config-custom/node_modules ./packages/eslint-config-custom/node_modules

# lib

COPY --from=build-stage /workspace/packages/lib/.turbo ./packages/lib/.turbo
COPY --from=build-stage /workspace/packages/lib/dist ./packages/lib/dist
COPY --from=build-stage /workspace/packages/lib/node_modules ./packages/lib/node_modules

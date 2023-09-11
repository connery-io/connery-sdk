#
# Build stage
#

FROM mcr.microsoft.com/devcontainers/typescript-node:18-bullseye as build-stage

WORKDIR /workspace

# specify yarn cache location
ENV YARN_CACHE_FOLDER=/workspace/yarn-cache

COPY package.json yarn.lock ./

COPY apps/docs/package.json ./apps/docs/package.json
COPY apps/runner/package.json ./apps/runner/package.json

COPY packages/connery/package.json ./packages/connery/package.json
COPY packages/eslint-config-custom/package.json ./packages/eslint-config-custom/package.json
COPY packages/lib/package.json ./packages/lib/package.json
COPY packages/tsconfig/package.json ./packages/tsconfig/package.json

# --network-timeout 1000000 is a workaround for building linux/arm64 images on ubuntu-latest GitHub runners
RUN yarn install --frozen-lock-file --network-timeout 1000000

COPY . .

RUN yarn run build

#
# Final stage - Prepre the cache image for the devcontainer
#

FROM mcr.microsoft.com/devcontainers/typescript-node:18-bullseye

WORKDIR /cache

# Copy yarn cache to the /cache/yarn folder

COPY --from=build-stage /workspace/yarn-cache ./yarn

# Copy node_modules and build artifacts to the /cache/project folder

# project root
COPY --from=build-stage /workspace/node_modules ./project/node_modules

# docs
COPY --from=build-stage /workspace/apps/docs/.docusaurus ./project/apps/docs/.docusaurus
COPY --from=build-stage /workspace/apps/docs/.turbo ./project/apps/docs/.turbo
COPY --from=build-stage /workspace/apps/docs/build ./project/apps/docs/build
COPY --from=build-stage /workspace/apps/docs/node_modules ./project/apps/docs/node_modules

# runner
COPY --from=build-stage /workspace/apps/runner/.turbo ./project/apps/runner/.turbo
COPY --from=build-stage /workspace/apps/runner/dist ./project/apps/runner/dist
COPY --from=build-stage /workspace/apps/runner/node_modules ./project/apps/runner/node_modules

# connery
COPY --from=build-stage /workspace/packages/connery/.turbo ./project/packages/connery/.turbo
COPY --from=build-stage /workspace/packages/connery/dist ./project/packages/connery/dist
COPY --from=build-stage /workspace/packages/connery/node_modules ./project/packages/connery/node_modules

# eslint-config-custom
COPY --from=build-stage /workspace/packages/eslint-config-custom/node_modules ./project/packages/eslint-config-custom/node_modules

# lib
COPY --from=build-stage /workspace/packages/lib/.turbo ./project/packages/lib/.turbo
COPY --from=build-stage /workspace/packages/lib/dist ./project/packages/lib/dist
COPY --from=build-stage /workspace/packages/lib/node_modules ./project/packages/lib/node_modules

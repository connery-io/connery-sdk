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

WORKDIR /

# Copy yarn cache to the /yarn-cache folder

COPY --from=build-stage /workspace/yarn-cache ./yarn-cache

# Copy node_modules and build artifacts to the /cache folder

# project root
COPY --from=build-stage /workspace/node_modules ./cache/node_modules

# docs
COPY --from=build-stage /workspace/apps/docs/.docusaurus ./cache/apps/docs/.docusaurus
COPY --from=build-stage /workspace/apps/docs/.turbo ./cache/apps/docs/.turbo
COPY --from=build-stage /workspace/apps/docs/build ./cache/apps/docs/build
COPY --from=build-stage /workspace/apps/docs/node_modules ./cache/apps/docs/node_modules

# runner
COPY --from=build-stage /workspace/apps/runner/.turbo ./cache/apps/runner/.turbo
COPY --from=build-stage /workspace/apps/runner/dist ./cache/apps/runner/dist
COPY --from=build-stage /workspace/apps/runner/node_modules ./cache/apps/runner/node_modules

# connery
COPY --from=build-stage /workspace/packages/connery/.turbo ./cache/packages/connery/.turbo
COPY --from=build-stage /workspace/packages/connery/dist ./cache/packages/connery/dist
COPY --from=build-stage /workspace/packages/connery/node_modules ./cache/packages/connery/node_modules

# eslint-config-custom
COPY --from=build-stage /workspace/packages/eslint-config-custom/node_modules ./cache/packages/eslint-config-custom/node_modules

# lib
COPY --from=build-stage /workspace/packages/lib/.turbo ./cache/packages/lib/.turbo
COPY --from=build-stage /workspace/packages/lib/dist ./cache/packages/lib/dist
COPY --from=build-stage /workspace/packages/lib/node_modules ./cache/packages/lib/node_modules

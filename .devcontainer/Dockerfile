FROM mcr.microsoft.com/devcontainers/typescript-node:18-bullseye

WORKDIR /workspace

COPY package.json yarn.lock ./

COPY apps/docs/package.json ./apps/docs/package.json
COPY apps/runner/package.json ./apps/runner/package.json

COPY packages/connery/package.json ./packages/connery/package.json
COPY packages/eslint-config-custom/package.json ./packages/eslint-config-custom/package.json
COPY packages/lib/package.json ./packages/lib/package.json
COPY packages/tsconfig/package.json ./packages/tsconfig/package.json

RUN yarn install

COPY . .

RUN yarn run build

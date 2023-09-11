FROM mcr.microsoft.com/devcontainers/typescript-node:18-bullseye

WORKDIR /workspace

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build

SHELL ["/bin/bash", "-c"]

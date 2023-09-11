FROM mcr.microsoft.com/devcontainers/typescript-node:18-bullseye

WORKDIR /workspace

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

# debug
RUN ls -la
RUN which yarn
RUN yarn --version
RUN ls -al ./node_modules/.bin
# end debug

RUN yarn run build

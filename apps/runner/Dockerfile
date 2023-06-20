FROM node:18 AS base

FROM base AS builder
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=runner --docker

FROM base AS installer
WORKDIR /app
# install the dependencies
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install
# build the app
COPY --from=builder /app/out/full/ .
RUN yarn run build --filter=runner

FROM base AS runner
WORKDIR /app
COPY --from=installer --chown=nestjs:nodejs ./app .
ENV NODE_ENV production
CMD [ "node", "apps/runner/dist/main" ]

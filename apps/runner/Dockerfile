FROM node:18-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=runner --docker

FROM base AS installer
WORKDIR /app
# install the dependencies
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
RUN pnpm install
# build the app
COPY --from=builder /app/out/full/ .
RUN pnpm run build --filter=runner

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs
COPY --from=installer --chown=nestjs:nodejs /app/apps/runner/dist ./dist
ENV NODE_ENV production
CMD [ "node", "dist/main" ]
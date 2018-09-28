# BUILD STAGE
FROM mhart/alpine-node AS builder

WORKDIR /app

COPY . .

RUN yarn install --production --pure-lockfile --ignore-engines

RUN yarn run build && \
    npx pkg@4.3.1 . --targets node9-alpine-x64 --out-path pkg

# FINAL STAGE
FROM alpine:3.7

RUN apk update && \
  apk add --no-cache libstdc++ libgcc ca-certificates && \
  rm -rf /var/cache/apk/*

WORKDIR /app

COPY --from=builder /app .

ENV NODE_ENV=production

EXPOSE 3000

CMD ["./pkg/next-fiven1"]

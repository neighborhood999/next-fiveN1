# BUILD STAGE
FROM mhart/alpine-node AS builder

WORKDIR /app

COPY . .

RUN yarn install \
    && yarn build

# FINAL STAGE
FROM mhart/alpine-node:base

WORKDIR /app

COPY --from=builder /app .

EXPOSE 3000

CMD ["node_modules/.bin/next", "start"]

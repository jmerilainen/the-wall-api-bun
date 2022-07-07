FROM debian:stable-slim as base

FROM jarredsumner/bun:edge as bun

FROM base

COPY --from=bun /opt/bun/bin/bun /bin/bun

WORKDIR /app

COPY ./app ./app
COPY ./package.json ./tsconfig.json ./

CMD ["bun", "run", "start"]

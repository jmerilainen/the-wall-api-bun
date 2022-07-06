# Based on https://github.com/fly-apps/bun/blob/main/Dockerfile

FROM debian:stable-slim as base

FROM base as bun

WORKDIR /bun

RUN apt-get update
RUN apt-get install curl unzip -y
RUN curl --fail --location --progress-bar --output "/bun/bun.zip" "https://github.com/Jarred-Sumner/bun/releases/download/bun-v0.1.1/bun-linux-x64.zip"
RUN unzip -d /bun -q -o "/bun/bun.zip"
RUN mv /bun/bun-linux-x64/bun /usr/local/bin/bun
RUN chmod 777 /usr/local/bin/bun

FROM base

COPY --from=bun /usr/local/bin/bun /bin/bun

WORKDIR /app

COPY ./app ./app
COPY ./server.ts ./
COPY ./tsconfig.json ./

CMD ["bun", "server.ts"]

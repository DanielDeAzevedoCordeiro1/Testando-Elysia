FROM oven/bun:1 AS builder

WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --production
COPY src ./src
COPY tsconfig.json ./
RUN bun build src/index.ts --compile --outfile app


FROM debian:bookworm-slim

WORKDIR /app
COPY --from=builder /app/app .

EXPOSE 3000
CMD ["./app"]

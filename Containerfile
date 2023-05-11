FROM registry.hub.docker.com/library/node:19-slim
RUN apt update
RUN apt install -y git
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm
RUN pnpm i --frozen-lockfile
CMD ["pnpm", "dev"]
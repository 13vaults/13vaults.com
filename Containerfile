FROM registry.hub.docker.com/library/node:19-slim
RUN apt update
RUN apt install -y git
RUN git config --global core.excludesFile '~/.gitignore'
RUN echo ".vscode" >> ~/.gitignore
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm
RUN pnpm i --frozen-lockfile
ENV NEXT_TELEMETRY_DISABLED=1
CMD ["pnpm", "dev"]
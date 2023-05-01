FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json /app/package.json
RUN pnpm install

COPY . .

EXPOSE 8081

CMD ["pnpm", "vite:dev"]


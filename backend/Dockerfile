FROM node:18-alpine

ENV DATABASE_URL="file:./dev.db"

WORKDIR /app

RUN npm install -g pnpm

COPY package.json /app/package.json
COPY prisma /app/prisma/
RUN pnpm install

COPY . .

#RUN pnpm exec prisma migrate deploy
#RUN pnpm exec prisma generate
RUN pnpm exec prisma generate
RUN pnpm exec prisma db push
# Should be using prisma migrate deploy on production


EXPOSE 3000

CMD ["pnpm", "nest:start:dev"]

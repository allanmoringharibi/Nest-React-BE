FROM node:16.14.2-alpine AS base

WORKDIR /app
COPY [ "package.json", "package-lock.json", "./"]

FROM base AS dev
RUN npm install --frozen-lockfile
COPY . .
CMD ["npm", "run", "start:dev"]
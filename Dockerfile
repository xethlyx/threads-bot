FROM node:14-alpine
WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

ENV NODE_ENV development
# pnpm is currently broken in docker
RUN npm i

COPY . .

RUN npm run-script build

ENV NODE_ENV production
RUN npm i

CMD ["npm", "run-script", "start"]
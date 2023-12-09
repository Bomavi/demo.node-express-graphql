FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn --production --silent
COPY . .
FROM node:12.13-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -g yarn 

COPY yarn.lock ./

RUN yarn install --only=development

COPY . .

EXPOSE 80

RUN yarn run build

FROM node:12.13-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -g yarn 

COPY yarn.lock ./

RUN yarn install --only=production

COPY . .

EXPOSE 80

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/src/main"]
FROM node:18

WORKDIR /app

Copy . .

RUN yarn install

COPY . .

EXPOSE 3000

RUN yarn run build

CMD ["yarn", "run", "start"]
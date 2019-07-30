FROM node:10

RUN mkdir server

WORKDIR /server

RUN yarn install

EXPOSE 3001

CMD [ "node", "index.js" ]
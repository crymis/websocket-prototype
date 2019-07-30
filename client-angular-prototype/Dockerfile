FROM node:10

RUN npm install -g @angular/cli

RUN mkdir app

WORKDIR /app

EXPOSE 4200

CMD ng serve --port 4200 --host 0.0.0.0 --poll 1

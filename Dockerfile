FROM node:alpine

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
COPY startapp.sh /app

RUN yarn install

COPY . /app

EXPOSE 3000

CMD ["/app/startapp.sh"]

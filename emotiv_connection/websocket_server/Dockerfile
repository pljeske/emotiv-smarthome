FROM node:current-alpine3.12

WORKDIR /usr/src/app

COPY index.js ./
COPY package.json ./
COPY package-lock.json ./

RUN npm install

EXPOSE 4000

ENTRYPOINT ["node", "index.js"]

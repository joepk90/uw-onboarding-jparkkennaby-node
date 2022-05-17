FROM node:18-alpine as build

WORKDIR /app

COPY package.json ./

RUN npm install --only=prod

COPY . .

EXPOSE 8080

CMD npm start
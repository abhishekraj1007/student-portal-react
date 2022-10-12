FROM node:16-alpine

WORKDIR /app

ADD package*.json ./

RUN npm install --force


ADD . .

CMD ["npm", "start"]
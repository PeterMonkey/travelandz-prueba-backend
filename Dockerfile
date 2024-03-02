FROM node:18

WORKDIR /app

COPY packega*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]
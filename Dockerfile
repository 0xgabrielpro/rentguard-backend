FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN test -f .env || cp .env.example .env

EXPOSE 3000

CMD ["node", "app.js"]

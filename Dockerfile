
FROM node:20-alpine3.19

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

RUN npx prisma generate

EXPOSE 3000

CMD [ "node", "dist/main.js" ]
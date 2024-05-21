
FROM node:20-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

RUN npx prisma generate

CMD [ "node", "dist/main.js" ]
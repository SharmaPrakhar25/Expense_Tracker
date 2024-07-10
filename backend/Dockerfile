FROM node:18.20-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

RUN dos2unix ./startup.sh && chmod +x ./startup.sh

ENV PORT=3001

CMD ["sh", "./startup.sh"]

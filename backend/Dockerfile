FROM node:18.20-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

ENV PORT=3001

CMD ["sh", "./dist/startup.sh"]

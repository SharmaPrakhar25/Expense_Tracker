FROM node:18.20-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

ENV PORT=3001
ENV DATABASE_URL="mysql://root:admin@172.17.0.2:3306/expense_tracker"

CMD ["sh", "dist/startup.sh"]

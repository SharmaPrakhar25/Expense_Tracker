#!/bin/sh
npx prisma generate
npx prisma migrate dev
node ./dist/server.js

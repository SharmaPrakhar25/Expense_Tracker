#!/bin/sh
npx prisma generate
npx prisma migrate dev
node server.js

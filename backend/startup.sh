#!/bin/sh

# Wait for the database to be ready
./wait-for-it.sh db:3306 --timeout=30 --strict -- echo "Database is up"

# Generate Prisma client
npx prisma generate
npx prisma migrate dev

npx prisma db seed
node ./dist/server.js


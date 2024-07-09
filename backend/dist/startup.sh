#!/bin/sh

# Wait for the database to be ready
./wait-for-it.sh db:3306 --timeout=30 --strict -- echo "Database is up"

# Generate Prisma client
npx prisma generate

# Run Prisma migrations
npx prisma migrate deploy

# Start the application
npm start

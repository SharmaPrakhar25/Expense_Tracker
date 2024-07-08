#!/bin/bash

# Install dependencies
npm install

# Install Prisma globally
npm install -g @prisma/cli

# Set PATH environment variable
export PATH=$PATH:/usr/local/bin

# Run Prisma commands
npx prisma migrate deploy
npx prisma generate

node ./dist/server.js


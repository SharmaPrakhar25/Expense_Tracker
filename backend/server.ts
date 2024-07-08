// const app = require("express")();
import express, { Application } from "express";
import Server from "./src/app";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

// const dotenv = require("dotenv");

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
  // * typescript way of initiating the express constructor
  const app: Application = express();
  new Server(app);
  const port: number = process.env.PORT ? parseInt(process.env.PORT) : 8080;
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

main()
  .then(async () => {
    console.log("Application running successfully");
  })
  .catch(async (e) => {
    console.error(e);
    if (e.code && e.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    }
    await prisma.$disconnect();
    process.exit(1);
  });

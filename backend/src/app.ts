import express, { Application } from "express";
import cors from "cors";
import { userRouter } from "./routes/user.routes";
import { expenseRouter } from "./routes/expense.routes";

export default class Server {
  constructor(app: Application) {
    this.config(app);
  }

  private config(app: Application): void {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/user", userRouter);
    app.use("/expense", expenseRouter);
  }
}

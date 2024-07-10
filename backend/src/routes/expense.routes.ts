import express from "express";
import {
  addUserExpense,
  fetchUserExpense,
} from "../controllers/expenseController";

export const expenseRouter = express.Router();
expenseRouter.post("/expense", addUserExpense);
expenseRouter.get("/:userId", fetchUserExpense);

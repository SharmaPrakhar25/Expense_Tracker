import express, { Request, Response } from "express";
import { expenseController } from "../controllers/expenseController";

export const expenseRouter = express.Router();

expenseRouter.post("/add", async (req: Request, res: Response) => {
  try {
    await expenseController.addUserExpense(req, res);
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
});

expenseRouter.get(
  "/:userId/fetchExpense",
  async (req: Request, res: Response) => {
    try {
      await expenseController.fetchUserExpense(req, res);
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  }
);

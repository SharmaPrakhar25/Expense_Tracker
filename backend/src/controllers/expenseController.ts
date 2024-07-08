import { Request, Response } from "express";
import { expenseHelper } from "../db/helpers/expenseHelper";

export const expenseController = {
  fetchUserExpense: async (req: Request, res: Response) => {
    try {
      const { user_id: userId } = req.params;
      const userExpense = await expenseHelper.fetchUserExpenses(
        parseInt(userId)
      );
      return res.json(userExpense);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  addUserExpense: async (req: Request, res: Response) => {
    try {
      const {
        user_id: userId,
        category,
        amount,
        is_shared: isShared,
        user_expense: sharedExpense,
      } = req.body;
      const addExpense = await expenseHelper.addUserExpense(
        userId,
        amount,
        category
        // isShared,
        // sharedExpense
      );
      if (addExpense)
        return res.json({
          message: "expense added successfully",
        });
    } catch (error) {
      console.log("error in controller");
      console.log(error);
      return res.status(500).json(error);
    }
  },
};

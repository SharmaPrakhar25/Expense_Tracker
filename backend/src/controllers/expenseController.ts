import e, { Request, Response } from "express";
import {
  fetchUserExpense as fetchUserExpenseHelper,
  addUserExpense as addUserExpenseHelper,
} from "../db/helpers/expenseHelper";
import { Code, Expense, FetchExpenseQuery, IApiResponse } from "../../types";

export async function fetchUserExpense(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const {
      sort_by: sortBy,
      sort_type: sortType,
      category,
      shared,
    } = req.query;

    const query: FetchExpenseQuery = {
      ...(userId && { userId: parseInt(userId as string) }),
      ...(sortBy && { sortBy: String(sortBy) }),
      ...(sortType && { sortType: String(sortType) }),
      ...(category && { category: String(category) }),
      // ...(expenseId && { expenseId: parseInt(expenseId as string) }),
      ...(shared && { shared: String(shared) }),
    };

    const userExpense = await fetchUserExpenseHelper(query);
    const successResponse: IApiResponse = {
      status: "SUCCESS",
      code: Code.SUCCESS,
      message: "Expense fetched successfully",
      data: userExpense,
    };
    console.log(userExpense);
    return res.status(Code.SUCCESS).json(successResponse);
  } catch (error) {
    console.log(error);
    const errorResponse: IApiResponse = {
      status: "ERROR",
      code: Code.BAD_REQUEST,
      message: "Something went wrong",
      error,
    };
    return res.status(Code.BAD_REQUEST).json(errorResponse);
  }
}

export async function addUserExpense(req: Request, res: Response) {
  try {
    const {
      user_id: userId,
      category,
      amount,
      is_shared: isShared,
      user_expense: sharedExpense,
      created_at,
    } = req.body;

    const expense: Expense = {
      owner_user_id: userId,
      category,
      total_amount: amount,
      shared: isShared,
      user_expense: sharedExpense,
      ...(created_at && { createdAt: new Date(created_at) }),
    };

    console.log(expense);

    await addUserExpenseHelper(expense);
    const successResponse: IApiResponse = {
      status: "SUCCESS",
      code: Code.CREATED,
      message: "Expense added successfully",
    };
    return res.status(Code.CREATED).json(successResponse);
  } catch (error) {
    const errorResponse: IApiResponse = {
      status: "ERROR",
      code: Code.BAD_REQUEST,
      message: "Something went wrong, Failed to save expense",
      error,
    };
    return res.status(Code.BAD_REQUEST).json(errorResponse);
  }
}

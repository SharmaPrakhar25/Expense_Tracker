import e, { Request, Response } from "express";
import {
  fetchUserExpense as fetchUserExpenseHelper,
  addUserExpense as addUserExpenseHeloer,
} from "../db/helpers/expenseHelper";
import { Code, IApiResponse } from "../../interfaces/response.interface";

export async function fetchUserExpense(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const userExpense = await fetchUserExpenseHelper(parseInt(userId));
    const successResponse: IApiResponse = {
      status: "SUCCESS",
      code: Code.SUCCESS,
      message: "Expense fetched successfully",
      data: userExpense,
    };
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
    } = req.body;

    await addUserExpenseHeloer(
      userId,
      amount,
      category,
      isShared,
      sharedExpense
    );
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

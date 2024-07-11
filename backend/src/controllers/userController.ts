import { Request, Response } from "express";
import {
  addUser as addUserHelper,
  fetchUser as fetchUserHelper,
} from "../db/helpers/userHelper";
import { Code, IApiResponse } from "../../types";

export async function addUser(req: Request, res: Response) {
  try {
    const { user: userObj } = req.body;
    await addUserHelper(userObj);
    const successResponse: IApiResponse = {
      status: "SUCCESS",
      code: Code.SUCCESS,
      message: "User created successfully",
    };
    return res.status(Code.CREATED).json(successResponse);
  } catch (error) {
    const errorResponse: IApiResponse = {
      status: "ERROR",
      code: Code.BAD_REQUEST,
      message: "Something went wrong",
      error,
    };
    return res.status(Code.BAD_REQUEST).json(errorResponse);
  }
}

export async function fetchUser(req: Request, res: Response) {
  try {
    const { user_id: userId } = req.body;
    const user = await fetchUserHelper(userId);
    const successResponse: IApiResponse = {
      status: "SUCCESS",
      code: Code.SUCCESS,
      message: "User fetched successfully",
      data: user,
    };

    return res.status(Code.SUCCESS).json(successResponse);
  } catch (error) {
    const errorResponse: IApiResponse = {
      status: "ERROR",
      code: Code.BAD_REQUEST,
      message: "Something went wrong",
      error,
    };
    return res.status(Code.BAD_REQUEST).json(errorResponse);
  }
}

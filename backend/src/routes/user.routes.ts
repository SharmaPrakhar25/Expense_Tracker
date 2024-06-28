import express, { Request, Response } from "express";
import { userController } from "../controllers/userController";
export const userRouter = express.Router();

userRouter.post("/user", async (req: Request, res: Response) => {
  try {
    await userController.addUser(req, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
    });
  }
});

import express, { Request, Response } from "express";
import { User, UserWithoutPassword } from "../interfaces/user.interface";
import { userHelper } from "../db/helpers/userHelper";

export const userController = {
  async addUser(req: Request, res: Response) {
    const { user: userObj } = req.body;
    const saveUser = await userHelper.addUser(userObj);
    return res.json({
      name: userObj.name,
      email: userObj.email,
      mobile: userObj.mobile,
    } as UserWithoutPassword);
  },

  async fetchUser(req: Request, res: Response) {
    const { user_id: userId } = req.body;
    const user = await userHelper.fetchUser(userId);
    return res.json(user);
  },
};

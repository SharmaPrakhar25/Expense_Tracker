// userHelper.ts

import { PrismaClient } from "@prisma/client";
import { User } from "../../../types"; // Adjust the import paths as necessary

const prisma = new PrismaClient();

export const addUser = async (userObj: User) => {
  try {
    return await prisma.user.create({
      data: {
        name: userObj.name,
        mobile: userObj.mobile,
        email: userObj.email,
      },
    });
  } catch (error) {
    throw new Error("Failed to save user in database");
  }
};

export const fetchUser = async (userId: number) => {
  try {
    return await prisma.user.findFirst({
      select: {
        email: true,
        name: true,
        mobile: true,
      },
      where: {
        id: userId,
      },
    });
  } catch (error) {
    throw new Error("Failed to fetch user from database");
  }
};

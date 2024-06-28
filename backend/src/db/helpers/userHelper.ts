import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { User, UserWithoutPassword } from "../../interfaces/user.interface";

export const userHelper = {
  addUser: async (userObj: User) => {
    return await prisma.user.create({
      data: {
        name: userObj.name,
        mobile: userObj.mobile,
        email: userObj.email,
      },
    });
  },
  fetchUser: async (userId: number): Promise<UserWithoutPassword | null> => {
    const user = await prisma.user.findFirst({
      select: {
        email: true,
        name: true,
        mobile: true,
      },
      where: {
        id: userId,
      },
    });

    return user as UserWithoutPassword | null;
  },
};

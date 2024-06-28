import { Prisma, PrismaClient } from "@prisma/client";
import {
  SharedUserExpenseInterface,
  UserExpenseInterface,
  UserWithoutPassword,
} from "../../interfaces/user.interface";
const prisma = new PrismaClient();

export const expenseHelper = {
  fetchUserExpenses: async function (userId: number, expenseId?: number) {
    let whereCondition: {
      user_id: number;
      [key: string]: number;
    } = {
      user_id: userId,
    };

    if (expenseId !== undefined) {
      whereCondition["expense_id"] = expenseId;
    }

    return await prisma.expense.findMany({
      relationLoadStrategy: "join",
      // include: {
      //   user_expense: {
      //     where: whereCondition,
      //   },
      // },
    });
  },
  addUserExpense: async function (
    userId: number,
    amount: number,
    category: string,
    isShared: boolean = false,
    sharedExpense: SharedUserExpenseInterface = []
  ) {
    let data: any = {
      total_amount: amount,
      owner_user_id: userId,
      // Assuming category is correctly handled according to your schema
      category: category,
      shared: isShared === false,
    };

    if (isShared && sharedExpense.length) {
      data.user_expense = {
        create: sharedExpense.map((user) => ({
          shared_with_user_id: user.user_id,
          shared_amount: user.sharedAmount,
        })),
      };
    }
    return await prisma.expense.create({
      data: data,
      include: {
        user_expense: isShared,
      },
    });
  },
};

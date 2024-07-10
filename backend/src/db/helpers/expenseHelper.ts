import { Prisma, PrismaClient } from "@prisma/client";
import { SharedUserExpenseInterface } from "../../../interfaces/user.interface";

const prisma = new PrismaClient();

export async function fetchUserExpense(userId: number, expenseId?: number) {
  try {
    let expenseIdArray: Array<number> = [];
    if (expenseId) {
      expenseIdArray = [expenseId];
    }
    const whereCondition: any = {
      OR: [{ owner_user_id: userId }],
    };

    // Fetch user_expense records separately based on shared_with_user_id
    const sharedUserExpenses = await prisma.user_expense.findMany({
      where: {
        shared_with_user_id: userId,
      },
      select: {
        expense_id: true,
      },
    });

    if (sharedUserExpenses) {
      for (let expense of sharedUserExpenses) {
        expenseIdArray.push(expense.expense_id);
      }
    }

    if (expenseIdArray.length > 0) {
      whereCondition.OR.push({
        id: {
          in: expenseIdArray,
        },
      });
    }

    const expenses = await prisma.expense.findMany({
      where: whereCondition,
      include: {
        user_expense: true,
      },
    });

    return expenses;
  } catch (error) {
    return error;
  }
}

export async function addUserExpense(
  userId: number,
  amount: number,
  category: string,
  isShared: boolean = false,
  sharedExpense: SharedUserExpenseInterface = []
) {
  try {
    const data: Prisma.expenseCreateInput = {
      shared: isShared,
      total_amount: amount,
      category: category.toLowerCase(),
      user: {
        connect: { id: userId },
      },
      user_expense: isShared
        ? {
            create: sharedExpense.map((sE) => ({
              shared_amount: sE.shared_amount,
              user: { connect: { id: sE.user_id } },
            })),
          }
        : undefined,
    };
    return await prisma.expense.create({
      data,
    });
  } catch (error) {
    return error;
  }
}

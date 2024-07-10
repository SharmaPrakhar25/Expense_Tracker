import { Prisma, PrismaClient } from "@prisma/client";
import {
  Expense,
  FetchExpenseQuery,
  SharedUserExpenseInterface,
} from "../../../types";

const prisma = new PrismaClient();

export async function fetchUserExpense(query: FetchExpenseQuery) {
  try {
    const { expenseId, userId, sortBy, sortType, category, shared } = query;
    let expenseIdArray: Array<number> = [];
    if (expenseId) {
      expenseIdArray = [expenseId];
    }
    const whereCondition: any = {
      AND: [{ owner_user_id: userId }],
    };

    if (category) {
      whereCondition.category = category.toLowerCase();
    }

    if (shared !== undefined) {
      whereCondition.shared = shared === "true";
    }

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

    console.log(whereCondition);
    if (expenseIdArray.length > 0) {
      whereCondition.AND.push({
        id: {
          in: expenseIdArray,
        },
      });
    }

    const orderByClause: any = [];
    if (sortBy && sortType) {
      orderByClause.push({
        [sortBy]: sortType,
      });
    }

    console.log(orderByClause);

    const expenses = await prisma.expense.findMany({
      where: whereCondition,
      include: {
        user_expense: true,
      },
      orderBy: orderByClause.length > 0 ? orderByClause : undefined,
    });

    return expenses;
  } catch (error) {
    return error;
  }
}

export async function addUserExpense(expense: Expense) {
  try {
    const data: Prisma.expenseCreateInput = {
      shared: expense.shared,
      total_amount: expense.total_amount,
      category: expense.category.toLowerCase(),
      user: {
        connect: { id: expense.owner_user_id },
      },
      user_expense:
        expense.shared && expense.user_expense
          ? {
              create: expense.user_expense.map((user) => ({
                shared_amount: user.shared_amount,
                user: { connect: { id: user.user_id } },
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

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUserExpense = fetchUserExpense;
exports.addUserExpense = addUserExpense;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function fetchUserExpense(userId, expenseId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let whereCondition = {
                user_id: userId,
            };
            if (expenseId !== undefined) {
                whereCondition["id"] = expenseId;
            }
            return yield prisma.expense.findMany({
                where: whereCondition,
                relationLoadStrategy: "join",
            });
        }
        catch (error) {
            throw new Error("Failed to fetch user expense");
        }
    });
}
function addUserExpense(userId_1, amount_1, category_1) {
    return __awaiter(this, arguments, void 0, function* (userId, amount, category, isShared = false, sharedExpense = []) {
        try {
            const data = {
                shared: isShared,
                total_amount: amount,
                category: category.toLowerCase(),
                user: {
                    connect: { id: userId },
                },
                user_expense: isShared
                    ? {
                        create: sharedExpense.map((user) => ({
                            shared_amount: user.sharedAmount,
                            user: { connect: { id: user.user_id } },
                        })),
                    }
                    : undefined,
            };
            return yield prisma.expense.create({
                data: data,
                include: {
                    user_expense: isShared,
                },
            });
        }
        catch (error) {
            throw new Error("Failed to add user expense");
        }
    });
}

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
exports.expenseController = void 0;
const expenseHelper_1 = require("../db/helpers/expenseHelper");
exports.expenseController = {
    fetchUserExpense: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user_id: userId } = req.body;
            const userExpense = yield expenseHelper_1.expenseHelper.fetchUserExpenses(userId);
            return res.json(userExpense);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }),
    addUserExpense: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user_id: userId, category, amount, is_shared: isShared, user_expense: sharedExpense, } = req.body;
            const addExpense = yield expenseHelper_1.expenseHelper.addUserExpense(userId, amount, category, isShared, sharedExpense);
            if (addExpense)
                return res.json({
                    message: "expense added successfully",
                });
        }
        catch (error) {
            console.log("error in controller");
            console.log(error);
            return res.status(500).json(error);
        }
    }),
};

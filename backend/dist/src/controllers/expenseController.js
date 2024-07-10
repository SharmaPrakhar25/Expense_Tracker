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
const expenseHelper_1 = require("../db/helpers/expenseHelper");
const response_interface_1 = require("../../interfaces/response.interface");
function fetchUserExpense(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user_id: userId } = req.params;
            const userExpense = yield (0, expenseHelper_1.fetchUserExpense)(parseInt(userId));
            console.log(userExpense);
            const successResponse = {
                status: "SUCCESS",
                code: response_interface_1.Code.SUCCESS,
                message: "Expense fetched successfully",
                data: userExpense,
            };
            return res.status(response_interface_1.Code.SUCCESS).json(successResponse);
        }
        catch (error) {
            const errorResponse = {
                status: "ERROR",
                code: response_interface_1.Code.BAD_REQUEST,
                message: "Something went wrong",
                error,
            };
            return res.status(response_interface_1.Code.BAD_REQUEST).json(errorResponse);
        }
    });
}
function addUserExpense(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user_id: userId, category, amount, is_shared: isShared, user_expense: sharedExpense, } = req.body;
            const addExpense = yield (0, expenseHelper_1.addUserExpense)(userId, amount, category
            // isShared,
            // sharedExpense
            );
            const successResponse = {
                status: "SUCCESS",
                code: response_interface_1.Code.CREATED,
                message: "Expense added successfully",
            };
            return res.status(response_interface_1.Code.CREATED).json(successResponse);
        }
        catch (error) {
            const errorResponse = {
                status: "ERROR",
                code: response_interface_1.Code.BAD_REQUEST,
                message: "Something went wrong, Failed to save expense",
                error,
            };
            return res.status(response_interface_1.Code.BAD_REQUEST).json(errorResponse);
        }
    });
}

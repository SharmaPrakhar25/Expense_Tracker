"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseRouter = void 0;
const express_1 = __importDefault(require("express"));
const expenseController_1 = require("../controllers/expenseController");
exports.expenseRouter = express_1.default.Router();
exports.expenseRouter.post("/add", expenseController_1.addUserExpense);
exports.expenseRouter.get("/:userId/fetchExpense", expenseController_1.fetchUserExpense);

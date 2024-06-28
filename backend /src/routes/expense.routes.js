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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseRouter = void 0;
const express_1 = __importDefault(require("express"));
const expenseController_1 = require("../controllers/expenseController");
exports.expenseRouter = express_1.default.Router();
exports.expenseRouter.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield expenseController_1.expenseController.addUserExpense(req, res);
    }
    catch (error) {
        console.log("error in routes");
        console.log(error);
        return res.status(500).json({
            error,
        });
    }
}));
exports.expenseRouter.get("/fetchExpense", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield expenseController_1.expenseController.fetchUserExpense(req, res);
    }
    catch (error) {
        console.log("error in routes");
        console.log(error);
        return res.status(500).json({
            error,
        });
    }
}));

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
exports.addUser = addUser;
exports.fetchUser = fetchUser;
const userHelper_1 = require("../db/helpers/userHelper");
const response_interface_1 = require("../../interfaces/response.interface");
function addUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user: userObj } = req.body;
            yield (0, userHelper_1.addUser)(userObj);
            const successResponse = {
                status: "SUCCESS",
                code: response_interface_1.Code.SUCCESS,
                message: "User created successfully",
            };
            return res.status(response_interface_1.Code.CREATED).json(successResponse);
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
function fetchUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user_id: userId } = req.body;
            const user = yield (0, userHelper_1.fetchUser)(userId);
            const successResponse = {
                status: "SUCCESS",
                code: response_interface_1.Code.SUCCESS,
                message: "User fetched successfully",
                data: user,
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

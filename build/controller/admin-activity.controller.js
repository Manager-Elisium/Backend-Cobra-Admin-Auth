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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.allDataList = allDataList;
const encrypt_1 = require("src/common/encrypt");
const admin_activity_service_1 = require("src/services/admin-activity.service");
const secretKey = (_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.SECRET_KEY) !== null && _b !== void 0 ? _b : 'SWS0zf0thg8T5Gz3scOSQ2W4r6r7GJAg';
function allDataList(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { token, TIME_PERIODS, MODULE, ROLE_ID } = req.body;
            const { take, page } = req.query;
            const query = {
                take: take || 10,
                page: page || 1,
                ID: token === null || token === void 0 ? void 0 : token.ADMIN_ID,
                TIME_PERIODS: TIME_PERIODS || 'Today',
                MODULE: MODULE || '',
                ROLE_ID: ROLE_ID || null
            };
            let data = yield (0, admin_activity_service_1.paginationActivityService)(query);
            let encryptedData = yield (0, encrypt_1.encrypt)(JSON.stringify(data), secretKey);
            return res.json({ status: true, data: encryptedData, message: "Admin Activity List" });
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
//# sourceMappingURL=admin-activity.controller.js.map
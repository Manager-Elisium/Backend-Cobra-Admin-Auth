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
exports.paginationActivityService = paginationActivityService;
const moment_1 = __importDefault(require("moment"));
const error_type_1 = require("src/common/error-type");
const standard_error_1 = __importDefault(require("src/common/standard-error"));
const admin_activity_repository_1 = require("src/repository/admin-activity.repository");
function paginationActivityService(body) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const timePeriods = [
            'Today',
            'Last Seven Days',
            'Last Month',
            'Last Six Months',
            'Last Year',
            'Overall Statistics'
        ];
        if (!timePeriods.includes(body.TIME_PERIODS)) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Time Periods Selection Error.");
        }
        const query = {
            take: body.take,
            skip: (body.page - 1) * body.take
        };
        if (body.TIME_PERIODS === "Today") {
            query.startDate = (0, moment_1.default)().startOf('D');
            query.endDate = (0, moment_1.default)().endOf('D');
        }
        else if (body.TIME_PERIODS === "Last Seven Days") {
            query.startDate = (0, moment_1.default)().startOf('D').subtract(7, 'days');
            query.endDate = (0, moment_1.default)().endOf('D');
        }
        else if (body.TIME_PERIODS === "Last Month") {
            query.startDate = (0, moment_1.default)().startOf('D').subtract(30, 'days');
            query.endDate = (0, moment_1.default)().endOf('D');
        }
        else if (body.TIME_PERIODS === "Last Six Months") {
            query.startDate = (0, moment_1.default)().startOf('D').subtract(180, 'days');
            query.endDate = (0, moment_1.default)().endOf('D');
        }
        else if (body.TIME_PERIODS === "Last Year") {
            query.startDate = (0, moment_1.default)().startOf('D').subtract(365, 'days');
            query.endDate = (0, moment_1.default)().endOf('D');
        }
        if (!!body.MODULE) {
            query.MODULE = body.MODULE;
        }
        if (!!body.ROLE_ID) {
            query.ROLE_ID = body.ROLE_ID;
        }
        const data = yield (0, admin_activity_repository_1.activityList)(query);
        if (!data) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Activity list Found Error.");
        }
        console.log(query);
        const list = (_a = data === null || data === void 0 ? void 0 : data[0]) !== null && _a !== void 0 ? _a : [];
        return { list: list, count: data === null || data === void 0 ? void 0 : data[1] };
    });
}
//# sourceMappingURL=admin-activity.service.js.map
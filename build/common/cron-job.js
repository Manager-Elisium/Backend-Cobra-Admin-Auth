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
exports.job = void 0;
const cron_1 = require("cron");
const moment_1 = __importDefault(require("moment"));
const admin_dashbaord_service_1 = require("src/services/admin-dashbaord.service");
exports.job = new cron_1.CronJob('0 0 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = (0, moment_1.default)().startOf('D');
    const body = {
        CREATED_DATE: currentDate
    };
    yield (0, admin_dashbaord_service_1.lobbyDashboardService)(body);
    yield (0, admin_dashbaord_service_1.vipCardDashboardService)(body);
    yield (0, admin_dashbaord_service_1.createDashboardService)(body);
}), null, true, 'Asia/Kolkata');
//# sourceMappingURL=cron-job.js.map
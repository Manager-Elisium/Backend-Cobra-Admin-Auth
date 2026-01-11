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
exports.dashboardData = dashboardData;
exports.insertOne = insertOne;
exports.countByDate = countByDate;
const admin_dashboard_entity_1 = require("src/domain/admin-dashboard.entity");
function dashboardData(data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!!(data === null || data === void 0 ? void 0 : data.startDate) && !!(data === null || data === void 0 ? void 0 : data.endDate)) {
            const dashboardRepository = admin_dashboard_entity_1.AdminDashboard.getRepository();
            const counts = yield dashboardRepository
                .createQueryBuilder('dashboard')
                .select([
                'SUM(dashboard.PLAYER_LOGIN_IN) AS PLAYER_LOGIN_IN',
                'SUM(dashboard.TOTAL_USER) AS TOTAL_USER',
                'SUM(dashboard.AVERAGE_PLAYER_ACTIVE_TIME) AS AVERAGE_PLAYER_ACTIVE_TIME',
                'SUM(dashboard.PLAYERS_COLLECTED_REWARDS) AS PLAYERS_COLLECTED_REWARDS',
                'SUM(dashboard.NEW_PLAYERS_SIGNED_UP) AS NEW_PLAYERS_SIGNED_UP',
                'SUM(dashboard.GUEST_PLAYERS_SIGNED_UP) AS GUEST_PLAYERS_SIGNED_UP',
                'SUM(dashboard.SEASON_PASS_PURCHASES) AS SEASON_PASS_PURCHASES',
                'SUM(dashboard.UNRESOLVED_REPORT) AS UNRESOLVED_REPORT',
                'SUM(dashboard.RESOLVED_REPORT) AS RESOLVED_REPORT',
                'SUM(dashboard.PLAYERS_PLAYED_2P) AS PLAYERS_PLAYED_2P',
                'SUM(dashboard.PLAYERS_PLAYED_3P) AS PLAYERS_PLAYED_3P',
                'SUM(dashboard.PLAYERS_PLAYED_4P) AS PLAYERS_PLAYED_4P',
                'SUM(dashboard.PLAYERS_SHOP_PURCHASED_GOLD_COINS) AS PLAYERS_SHOP_PURCHASED_GOLD_COINS',
                'SUM(dashboard.PLAYERS_SHOP_PURCHASED_DIAMONDS) AS PLAYERS_SHOP_PURCHASED_DIAMONDS',
                'SUM(dashboard.PLAYERS_SHOP_PURCHASED_ITEMS) AS PLAYERS_SHOP_PURCHASED_ITEMS'
            ])
                .where('dashboard.CREATED_DATE BETWEEN :startDate AND :endDate', {
                startDate: data === null || data === void 0 ? void 0 : data.startDate,
                endDate: data === null || data === void 0 ? void 0 : data.endDate
            })
                .getRawOne();
            return counts;
        }
        else {
            const dashboardRepository = admin_dashboard_entity_1.AdminDashboard.getRepository();
            const counts = yield dashboardRepository
                .createQueryBuilder('dashboard')
                .select([
                'SUM(dashboard.PLAYER_LOGIN_IN) AS PLAYER_LOGIN_IN',
                'SUM(dashboard.TOTAL_USER) AS TOTAL_USER',
                'SUM(dashboard.AVERAGE_PLAYER_ACTIVE_TIME) AS AVERAGE_PLAYER_ACTIVE_TIME',
                'SUM(dashboard.PLAYERS_COLLECTED_REWARDS) AS PLAYERS_COLLECTED_REWARDS',
                'SUM(dashboard.NEW_PLAYERS_SIGNED_UP) AS NEW_PLAYERS_SIGNED_UP',
                'SUM(dashboard.GUEST_PLAYERS_SIGNED_UP) AS GUEST_PLAYERS_SIGNED_UP',
                'SUM(dashboard.SEASON_PASS_PURCHASES) AS SEASON_PASS_PURCHASES',
                'SUM(dashboard.UNRESOLVED_REPORT) AS UNRESOLVED_REPORT',
                'SUM(dashboard.RESOLVED_REPORT) AS RESOLVED_REPORT',
                'SUM(dashboard.PLAYERS_PLAYED_2P) AS PLAYERS_PLAYED_2P',
                'SUM(dashboard.PLAYERS_PLAYED_3P) AS PLAYERS_PLAYED_3P',
                'SUM(dashboard.PLAYERS_PLAYED_4P) AS PLAYERS_PLAYED_4P',
                'SUM(dashboard.PLAYERS_SHOP_PURCHASED_GOLD_COINS) AS PLAYERS_SHOP_PURCHASED_GOLD_COINS',
                'SUM(dashboard.PLAYERS_SHOP_PURCHASED_DIAMONDS) AS PLAYERS_SHOP_PURCHASED_DIAMONDS',
                'SUM(dashboard.PLAYERS_SHOP_PURCHASED_ITEMS) AS PLAYERS_SHOP_PURCHASED_ITEMS'
            ])
                .getRawOne();
            return counts;
        }
    });
}
function insertOne(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield admin_dashboard_entity_1.AdminDashboard.save(data);
    });
}
function countByDate(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield admin_dashboard_entity_1.AdminDashboard.count(data);
    });
}
//# sourceMappingURL=admin-dashboard.repository.js.map
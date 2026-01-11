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
exports.insertVipCard = insertVipCard;
exports.countByDateVipCard = countByDate;
exports.dashboardVipCardData = dashboardVipCardData;
const vip_card_dashboard_entity_1 = require("src/domain/vip-card-dashboard.entity");
function dashboardVipCardData(data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!!(data === null || data === void 0 ? void 0 : data.startDate) && !!(data === null || data === void 0 ? void 0 : data.endDate)) {
            const dashboardRepository = vip_card_dashboard_entity_1.VipCardDashboard.getRepository();
            const counts = yield dashboardRepository
                .createQueryBuilder('vip')
                .select([
                "vip.VIP_CARD_ID as VIP_CARD_ID",
                "SUM(vip.PLAYER_BOUGHT) AS TOTAL_PLAYER_BOUGHT"
            ]).where('vip.CREATED_DATE BETWEEN :startDate AND :endDate', {
                startDate: data === null || data === void 0 ? void 0 : data.startDate,
                endDate: data === null || data === void 0 ? void 0 : data.endDate
            })
                .groupBy("vip.VIP_CARD_ID")
                .getRawMany();
            return counts;
        }
        else {
            const dashboardRepository = vip_card_dashboard_entity_1.VipCardDashboard.getRepository();
            const counts = yield dashboardRepository
                .createQueryBuilder('vip')
                .select([
                "vip.VIP_CARD_ID as VIP_CARD_ID",
                "SUM(vip.PLAYER_BOUGHT) AS TOTAL_PLAYER_BOUGHT"
            ])
                .groupBy("vip.VIP_CARD_ID")
                .getRawMany();
            return counts;
        }
    });
}
function insertVipCard(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield vip_card_dashboard_entity_1.VipCardDashboard.save(data);
    });
}
function countByDate(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield vip_card_dashboard_entity_1.VipCardDashboard.count(data);
    });
}
//# sourceMappingURL=vip-card-dashboard.repository.js.map
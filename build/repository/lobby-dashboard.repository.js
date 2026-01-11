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
exports.insertLobbyCard = insertLobbyCard;
exports.countByDateLobby = countByDate;
exports.dashboardLobbyData = dashboardLobbyData;
const lobby_dashboard_entity_1 = require("src/domain/lobby-dashboard.entity");
function dashboardLobbyData(data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!!(data === null || data === void 0 ? void 0 : data.startDate) && !!(data === null || data === void 0 ? void 0 : data.endDate)) {
            const dashboardRepository = lobby_dashboard_entity_1.LobbyDashboard.getRepository();
            const counts = yield dashboardRepository
                .createQueryBuilder('lobby')
                .select([
                "lobby.LOBBY_ID as LOBBY_ID",
                "SUM(lobby.PLAYER_PLAYED) AS TOTAL_PLAYER_PLAYED"
            ]).where('lobby.CREATED_DATE BETWEEN :startDate AND :endDate', {
                startDate: data === null || data === void 0 ? void 0 : data.startDate,
                endDate: data === null || data === void 0 ? void 0 : data.endDate
            })
                .groupBy("lobby.LOBBY_ID")
                .getRawMany();
            return counts;
        }
        else {
            const dashboardRepository = lobby_dashboard_entity_1.LobbyDashboard.getRepository();
            const counts = yield dashboardRepository
                .createQueryBuilder('lobby')
                .select([
                "lobby.LOBBY_ID as LOBBY_ID",
                "SUM(lobby.PLAYER_PLAYED) AS TOTAL_PLAYER_PLAYED"
            ])
                .groupBy("lobby.LOBBY_ID")
                .getRawMany();
            return counts;
        }
    });
}
function insertLobbyCard(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield lobby_dashboard_entity_1.LobbyDashboard.save(data);
    });
}
function countByDate(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield lobby_dashboard_entity_1.LobbyDashboard.count(data);
    });
}
//# sourceMappingURL=lobby-dashboard.repository.js.map
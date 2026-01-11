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
exports.paginationDashboardService = paginationDashboardService;
exports.createDashboardService = createDashboardService;
exports.vipCardDashboardService = vipCardDashboardService;
exports.lobbyDashboardService = lobbyDashboardService;
const axios_1 = __importDefault(require("axios"));
const moment_1 = __importDefault(require("moment"));
const error_type_1 = require("src/common/error-type");
const standard_error_1 = __importDefault(require("src/common/standard-error"));
const admin_dashboard_repository_1 = require("src/repository/admin-dashboard.repository");
const lobby_dashboard_repository_1 = require("src/repository/lobby-dashboard.repository");
const vip_card_dashboard_repository_1 = require("src/repository/vip-card-dashboard.repository");
const typeorm_1 = require("typeorm");
function paginationDashboardService(body) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
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
        const statistics = yield (0, admin_dashboard_repository_1.dashboardData)(query);
        const lobbyStatistics = yield (0, lobby_dashboard_repository_1.dashboardLobbyData)(query);
        const vipCardStatistics = yield (0, vip_card_dashboard_repository_1.dashboardVipCardData)(query);
        const lobbyImageAndTitleStatistics = yield axios_1.default.get(`http://192.168.1.46:3001/lobby/get-list`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        const lobbyList = (_b = (_a = lobbyImageAndTitleStatistics === null || lobbyImageAndTitleStatistics === void 0 ? void 0 : lobbyImageAndTitleStatistics.data) === null || _a === void 0 ? void 0 : _a.list) !== null && _b !== void 0 ? _b : [];
        const lobbyData = lobbyList === null || lobbyList === void 0 ? void 0 : lobbyList.map((data) => {
            let lobbyDetail = lobbyStatistics.find((lobby) => lobby.lobby_id == data.ID);
            return Object.assign(Object.assign({}, data), lobbyDetail);
        });
        const vipCardImageAndTitleStatistics = yield axios_1.default.get(`http://192.168.1.46:3001/vip_card/get-list`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        const vipCardList = (_d = (_c = vipCardImageAndTitleStatistics === null || vipCardImageAndTitleStatistics === void 0 ? void 0 : vipCardImageAndTitleStatistics.data) === null || _c === void 0 ? void 0 : _c.list) !== null && _d !== void 0 ? _d : [];
        const vipCardData = vipCardList === null || vipCardList === void 0 ? void 0 : vipCardList.map((data) => {
            let vipCardDetail = vipCardStatistics.find((lobby) => lobby.vip_card_id == data.ID);
            return Object.assign(Object.assign({}, data), vipCardDetail);
        });
        if (!statistics) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Dashboard Found Error.");
        }
        return { statistics, lobbyStatistics: lobbyData, vipCardStatistics: vipCardData };
    });
}
function createDashboardService(body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { CREATED_DATE } = body;
            const endDate = (0, moment_1.default)().endOf('D');
            const query = {
                where: [
                    {
                        CREATED_DATE: (0, typeorm_1.Between)(CREATED_DATE, endDate)
                    }
                ],
            };
            const isAvailable = yield (0, admin_dashboard_repository_1.countByDate)(query);
            // console.log(isAvailable)
            if (isAvailable) {
                console.log("Dashboard Service is also created.");
            }
            else {
                const data = yield (0, admin_dashboard_repository_1.insertOne)(body);
                if (!data) {
                    console.log("Dashboard Service is not created.");
                }
                // console.log(data)
            }
        }
        catch (error) {
        }
    });
}
function vipCardDashboardService(body) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const { CREATED_DATE } = body;
            const endDate = (0, moment_1.default)().endOf('D');
            const query = {
                where: [
                    {
                        CREATED_DATE: (0, typeorm_1.Between)(CREATED_DATE, endDate)
                    }
                ],
            };
            const isAvailable = yield (0, vip_card_dashboard_repository_1.countByDateVipCard)(query);
            console.log(isAvailable, "Vip Card");
            if (isAvailable) {
                console.log("Vip Card Service is also created.");
            }
            else {
                const vipCardStatistics = yield axios_1.default.get(`http://192.168.1.46:3001/vip_card/get-list`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const vipCardList = (_b = (_a = vipCardStatistics === null || vipCardStatistics === void 0 ? void 0 : vipCardStatistics.data) === null || _a === void 0 ? void 0 : _a.list) !== null && _b !== void 0 ? _b : [];
                body.VIP_CARD_STATISTICS = vipCardList === null || vipCardList === void 0 ? void 0 : vipCardList.map((data) => {
                    return {
                        VIP_CARD_ID: data === null || data === void 0 ? void 0 : data.ID,
                        TITLE: data === null || data === void 0 ? void 0 : data.TITLE,
                        PLAYER_BOUGHT: 0
                    };
                });
                delete body.CREATED_DATE;
                const data = yield (0, vip_card_dashboard_repository_1.insertVipCard)(body === null || body === void 0 ? void 0 : body.VIP_CARD_STATISTICS);
                if (!data) {
                    console.log("Vip Card Service is not created.");
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
function lobbyDashboardService(body) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const { CREATED_DATE } = body;
            const endDate = (0, moment_1.default)().endOf('D');
            const query = {
                where: [
                    {
                        CREATED_DATE: (0, typeorm_1.Between)(CREATED_DATE, endDate)
                    }
                ],
            };
            const isAvailable = yield (0, lobby_dashboard_repository_1.countByDateLobby)(query);
            console.log(isAvailable, "Lobby");
            if (isAvailable) {
                console.log("Dashboard Service is also created.");
            }
            else {
                const lobbyStatistics = yield axios_1.default.get(`http://192.168.1.46:3001/lobby/get-list`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const lobbyList = (_b = (_a = lobbyStatistics === null || lobbyStatistics === void 0 ? void 0 : lobbyStatistics.data) === null || _a === void 0 ? void 0 : _a.list) !== null && _b !== void 0 ? _b : [];
                var insertMany = lobbyList === null || lobbyList === void 0 ? void 0 : lobbyList.map((data) => {
                    return {
                        LOBBY_ID: data === null || data === void 0 ? void 0 : data.ID,
                        TITLE: data === null || data === void 0 ? void 0 : data.TITLE,
                        PLAYER_PLAYED: 0
                    };
                });
                delete body.CREATED_DATE;
                console.log(insertMany);
                const data = yield (0, lobby_dashboard_repository_1.insertLobbyCard)(insertMany);
                if (!data) {
                    console.log("Lobby Service is not created.");
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
//# sourceMappingURL=admin-dashbaord.service.js.map
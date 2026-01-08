import axios from "axios";
import moment from "moment";
import { ErrorCodes } from "src/common/error-type";
import StandardError from "src/common/standard-error";
import { countByDate, dashboardData, insertOne } from "src/repository/admin-dashboard.repository";
import { countByDateLobby, dashboardLobbyData, insertLobbyCard } from "src/repository/lobby-dashboard.repository";
import { countByDateVipCard, dashboardVipCardData, insertVipCard } from "src/repository/vip-card-dashboard.repository";
import { Between } from "typeorm";


async function paginationDashboardService(body: any) {
    const timePeriods = [
        'Today',
        'Last Seven Days',
        'Last Month',
        'Last Six Months',
        'Last Year',
        'Overall Statistics'
    ];
    if (!timePeriods.includes(body.TIME_PERIODS)) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Time Periods Selection Error."
        );
    }
    const query = {
        take: body.take,
        skip: (body.page - 1) * body.take
    } as any;
    if (body.TIME_PERIODS === "Today") {
        query.startDate = moment().startOf('D');
        query.endDate = moment().endOf('D');
    } else if (body.TIME_PERIODS === "Last Seven Days") {
        query.startDate = moment().startOf('D').subtract(7, 'days');
        query.endDate = moment().endOf('D');
    } else if (body.TIME_PERIODS === "Last Month") {
        query.startDate = moment().startOf('D').subtract(30, 'days');
        query.endDate = moment().endOf('D');
    } else if (body.TIME_PERIODS === "Last Six Months") {
        query.startDate = moment().startOf('D').subtract(180, 'days');
        query.endDate = moment().endOf('D');
    } else if (body.TIME_PERIODS === "Last Year") {
        query.startDate = moment().startOf('D').subtract(365, 'days');
        query.endDate = moment().endOf('D');
    }

    const statistics = await dashboardData(query) as any;
    const lobbyStatistics = await dashboardLobbyData(query) as any;
    const vipCardStatistics = await dashboardVipCardData(query) as any;
    const lobbyImageAndTitleStatistics = await axios.get(`http://13.127.87.96/lobby/get-list`, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    const lobbyList = lobbyImageAndTitleStatistics?.data?.list ?? [];

    const lobbyData = lobbyList?.map((data) => {
        let lobbyDetail = lobbyStatistics.find((lobby) => lobby.lobby_id == data.ID);
        return {
            ...data,
            ...lobbyDetail
        }
    });

    const vipCardImageAndTitleStatistics = await axios.get(`http://13.127.87.96/vip_card/get-list`, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    const vipCardList = vipCardImageAndTitleStatistics?.data?.list ?? [];
    const vipCardData = vipCardList?.map((data) => {
        let vipCardDetail = vipCardStatistics.find((lobby) => lobby.vip_card_id == data.ID);
        return {
            ...data,
            ...vipCardDetail
        }
    });

    if (!statistics) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Dashboard Found Error."
        );
    }
    return { statistics, lobbyStatistics: lobbyData, vipCardStatistics: vipCardData };
}



async function createDashboardService(body: any) {
    try {
        const { CREATED_DATE } = body;
        const endDate = moment().endOf('D');
        const query = {
            where: [
                {
                    CREATED_DATE: Between(CREATED_DATE, endDate)
                }
            ],
        }
        const isAvailable = await countByDate(query);
        // console.log(isAvailable)
        if (isAvailable) {
            console.log(
                "Dashboard Service is also created."
            );
        } else {
            const data = await insertOne(body) as any;
            if (!data) {
                console.log(
                    "Dashboard Service is not created."
                );
            }
            // console.log(data)
        }
    } catch (error) {

    }
}


async function vipCardDashboardService(body: any) {
    try {
        const { CREATED_DATE } = body;
        const endDate = moment().endOf('D');
        const query = {
            where: [
                {
                    CREATED_DATE: Between(CREATED_DATE, endDate)
                }
            ],
        }
        const isAvailable = await countByDateVipCard(query);
        console.log(isAvailable, "Vip Card")
        if (isAvailable) {
            console.log(
                "Vip Card Service is also created."
            );
        } else {
            const vipCardStatistics = await axios.get(`http://13.127.87.96/vip_card/get-list`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const vipCardList = vipCardStatistics?.data?.list ?? [];
            body.VIP_CARD_STATISTICS = vipCardList?.map((data) => {
                return {
                    VIP_CARD_ID: data?.ID,
                    TITLE: data?.TITLE,
                    PLAYER_BOUGHT: 0
                }
            });
            delete body.CREATED_DATE;
            const data = await insertVipCard(body?.VIP_CARD_STATISTICS) as any;
            if (!data) {
                console.log(
                    "Vip Card Service is not created."
                );
            }
        }

    } catch (error) {
        console.log(error);

    }
}


async function lobbyDashboardService(body: any) {
    try {
        const { CREATED_DATE } = body;
        const endDate = moment().endOf('D');
        const query = {
            where: [
                {
                    CREATED_DATE: Between(CREATED_DATE, endDate)
                }
            ],
        }
        const isAvailable = await countByDateLobby(query);
        console.log(isAvailable, "Lobby")
        if (isAvailable) {
            console.log(
                "Dashboard Service is also created."
            );
        } else {
            const lobbyStatistics = await axios.get(`http://13.127.87.96/lobby/get-list`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const lobbyList = lobbyStatistics?.data?.list ?? [];
            var insertMany = lobbyList?.map((data) => {
                return {
                    LOBBY_ID: data?.ID,
                    TITLE: data?.TITLE,
                    PLAYER_PLAYED: 0
                }
            });
            delete body.CREATED_DATE;
            console.log(insertMany)
            const data = await insertLobbyCard(insertMany) as any;
            if (!data) {
                console.log(
                    "Lobby Service is not created."
                );
            }
        }
    } catch (error) {
        console.log(error);

    }

}

export { paginationDashboardService, createDashboardService, vipCardDashboardService, lobbyDashboardService };
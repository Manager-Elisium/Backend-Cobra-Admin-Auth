import { LobbyDashboard } from "src/domain/lobby-dashboard.entity";

async function dashboardLobbyData(data: any) {
    if (!!data?.startDate && !!data?.endDate) {
        const dashboardRepository = LobbyDashboard.getRepository();
        const counts = await dashboardRepository
            .createQueryBuilder('lobby')
            .select([
                "lobby.LOBBY_ID as LOBBY_ID",
                "SUM(lobby.PLAYER_PLAYED) AS TOTAL_PLAYER_PLAYED"
            ]).where('lobby.CREATED_DATE BETWEEN :startDate AND :endDate', {
                startDate: data?.startDate,
                endDate: data?.endDate
            })
            .groupBy("lobby.LOBBY_ID")
            .getRawMany();
        return counts;
    } else {
        const dashboardRepository = LobbyDashboard.getRepository();
        const counts = await dashboardRepository
            .createQueryBuilder('lobby')
            .select([
                "lobby.LOBBY_ID as LOBBY_ID",
                "SUM(lobby.PLAYER_PLAYED) AS TOTAL_PLAYER_PLAYED"
            ])
            .groupBy("lobby.LOBBY_ID")
            .getRawMany();
        return counts;
    }

}



async function insertLobbyCard(data: any) {
    return await LobbyDashboard.save(data);
}


async function countByDate(data: any) {
    return await LobbyDashboard.count(data);
}

export { insertLobbyCard, countByDate as countByDateLobby, dashboardLobbyData };
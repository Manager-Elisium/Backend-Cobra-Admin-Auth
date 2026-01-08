import { AdminDashboard } from "src/domain/admin-dashboard.entity";

async function dashboardData(data: any) {
    if (!!data?.startDate && !!data?.endDate) {
        const dashboardRepository = AdminDashboard.getRepository();
        const counts = await dashboardRepository
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
                startDate: data?.startDate,
                endDate: data?.endDate
            })
            .getRawOne();
        return counts;
    } else {
        const dashboardRepository = AdminDashboard.getRepository();
        const counts = await dashboardRepository
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

}



async function insertOne(data: any) {
    return await AdminDashboard.save(data);
}


async function countByDate(data: any) {
    return await AdminDashboard.count(data);
}

export { dashboardData, insertOne, countByDate };
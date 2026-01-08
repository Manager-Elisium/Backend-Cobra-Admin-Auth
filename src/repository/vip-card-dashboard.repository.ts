import { VipCardDashboard } from "src/domain/vip-card-dashboard.entity";

async function dashboardVipCardData(data: any) {
    if (!!data?.startDate && !!data?.endDate) {
        const dashboardRepository = VipCardDashboard.getRepository();
        const counts = await dashboardRepository
            .createQueryBuilder('vip')
            .select([
                "vip.VIP_CARD_ID as VIP_CARD_ID",
                "SUM(vip.PLAYER_BOUGHT) AS TOTAL_PLAYER_BOUGHT"
            ]).where('vip.CREATED_DATE BETWEEN :startDate AND :endDate', {
                startDate: data?.startDate,
                endDate: data?.endDate
            })
            .groupBy("vip.VIP_CARD_ID")
            .getRawMany();
        return counts;
    } else {
        const dashboardRepository = VipCardDashboard.getRepository();
        const counts = await dashboardRepository
            .createQueryBuilder('vip')
            .select([
                "vip.VIP_CARD_ID as VIP_CARD_ID",
                "SUM(vip.PLAYER_BOUGHT) AS TOTAL_PLAYER_BOUGHT"
            ])
            .groupBy("vip.VIP_CARD_ID")
            .getRawMany();
        return counts;
    }

}



async function insertVipCard(data: any) {
    return await VipCardDashboard.save(data);
}


async function countByDate(data: any) {
    return await VipCardDashboard.count(data);
}

export { insertVipCard, countByDate as countByDateVipCard, dashboardVipCardData };
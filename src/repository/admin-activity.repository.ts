import { AdminActivity } from "src/domain/admin-activity.entity";
import { Between, In } from "typeorm";




async function activityList(data: any) {
    return await AdminActivity.findAndCount({
        where: [
            {
                CREATED_DATE: Between(data.startDate, data.endDate),
                MODULE: data.MODULE,
                ADMIN_ID: {
                    ROLE_ID: {
                        ID: data.ROLE_ID
                    }
                }
            }
        ],
        take: data.take,
        skip: data.skip,
        relations: ['ADMIN_ID']
    })
}


export { activityList };
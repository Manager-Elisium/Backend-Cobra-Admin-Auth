import { NextFunction } from "express";
import { Response, Request } from "express";
import { encrypt } from "src/common/encrypt";
import { paginationActivityService } from "src/services/admin-activity.service";
const secretKey = process?.env?.SECRET_KEY ?? 'SWS0zf0thg8T5Gz3scOSQ2W4r6r7GJAg';


async function allDataList(req: Request, res: Response, next: NextFunction) {
    try {
        const { token, TIME_PERIODS, MODULE, ROLE_ID } = req.body;
        const { take, page } = req.query
        const query = {
            take: take || 10,
            page: page || 1,
            ID: token?.ADMIN_ID,
            TIME_PERIODS: TIME_PERIODS || 'Today',
            MODULE: MODULE || '', 
            ROLE_ID: ROLE_ID || null
        }

        let data = await paginationActivityService(query);
        let encryptedData = await encrypt(JSON.stringify(data), secretKey);
        return res.json({ status: true, data: encryptedData, message: "Admin Activity List" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}






export { allDataList };
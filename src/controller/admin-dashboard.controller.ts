import { NextFunction } from "express";
import { Response, Request } from "express";
import { encrypt } from "src/common/encrypt";
import { paginationDashboardService } from "src/services/admin-dashbaord.service";
const secretKey = process?.env?.SECRET_KEY ?? 'SWS0zf0thg8T5Gz3scOSQ2W4r6r7GJAg';


async function dashboardController(req: Request, res: Response, next: NextFunction) {
    try {
        const { token } = req.body;
        const { timePeriods } = req.query;
        const query = {
            ID: token?.ADMIN_ID,
            TIME_PERIODS: timePeriods || 'Today'
        }
        let data = await paginationDashboardService(query);
        let encryptedData = await encrypt(JSON.stringify(data), secretKey);
        return res.json({ status: true, data: encryptedData, message: "Admin Dashboard" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}


export { dashboardController };
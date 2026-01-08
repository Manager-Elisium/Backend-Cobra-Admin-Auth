import { NextFunction } from "express";
import { Response, Request } from "express";
import { encrypt } from "src/common/encrypt";
import { createAdminService, findOneAdminService, paginationAdminService, updateAdminService, updatePasswordAdminService } from "src/services/admin-user.service";
const secretKey = process?.env?.SECRET_KEY ?? 'SWS0zf0thg8T5Gz3scOSQ2W4r6r7GJAg';

async function insert(req: Request, res: Response, next: NextFunction) {
    try {
        const reqBody = {
            ...req.body
        }
        let data = await createAdminService(reqBody);
        let encryptedData = await encrypt(JSON.stringify(data), secretKey);
        return res.json({ status: true, data: encryptedData, message: "Admin User create successfully" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}


async function allDataList(req: Request, res: Response, next: NextFunction) {
    try {
        const { token } = req.body;
        const { take, page } = req.query
        const query = {
            take: take || 10,
            page: page || 1,
            ID: token?.ID
        }
        let data = await paginationAdminService(query);
        let encryptedData = encrypt(JSON.stringify(data), secretKey);
        return res.json({ status: true, data: await encryptedData, message: "Admin User List" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}


async function getAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        let data = await findOneAdminService(id);
        let encryptedData = encrypt(JSON.stringify(data), secretKey);
        return res.json({ status: true, data: await encryptedData, message: "Get Admin successfully" }); // : 
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}


async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const updateAchievement = await updateAdminService(id, req.body);
        let encryptedData = await encrypt(JSON.stringify(updateAchievement), secretKey)
        return res.json({
            status: true, data: encryptedData, message: "Updated Data Sucessfully"
        });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}


async function updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
        const { token } = req.body;
        const updateAchievement = await updatePasswordAdminService(token?.ADMIN_ID, req.body);
        let encryptedData = await encrypt(JSON.stringify(updateAchievement), secretKey)
        return res.json({
            status: true, data: encryptedData, message: "Updated Data Sucessfully"
        });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}


export { insert, allDataList, getAdmin, update, updatePassword };
import { NextFunction } from "express";
import { Response, Request } from "express";
import { encrypt } from "src/common/encrypt";
import { createRoleService, findOneRoleService, listRoleService, paginationRoleService, updateRoleService } from "src/services/role.service";
const secretKey = process?.env?.SECRET_KEY ?? 'SWS0zf0thg8T5Gz3scOSQ2W4r6r7GJAg';

async function insert(req: Request, res: Response, next: NextFunction) {
    try {
        const reqBody = {
            ...req.body
        }
        let data = await createRoleService(reqBody);
        let encryptedData = await encrypt(JSON.stringify(data), secretKey);
        return res.json({ status: true, data: encryptedData, message: "Role create successfully" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}


async function allDataList(req: Request, res: Response, next: NextFunction) {
    try {
        const { take, page } = req.query
        const query = {
            take: take || 10,
            page: page || 1
        }
        let data = await paginationRoleService(query);
        let encryptedData = encrypt(JSON.stringify(data), secretKey);
        return res.json({ status: true, data: await encryptedData, message: "Role List" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}


async function getRole(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        let data = await findOneRoleService(id);
        let encryptedData = encrypt(JSON.stringify(data), secretKey);
        return res.json({ status: true, data: await encryptedData, message: "Get Role successfully" }); // : 
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}


async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const updateAchievement = await updateRoleService(id, req.body);
        let encryptedData = await encrypt(JSON.stringify(updateAchievement), secretKey)
        return res.json({
            status: true, data: encryptedData, message: "Updated Data Sucessfully"
        });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}


async function listRole(req: Request, res: Response, next: NextFunction) {
    try {
        let data = await listRoleService();
        let encryptedData = await encrypt(JSON.stringify(data), secretKey);
        return res.json({ status: true, data: encryptedData, message: "Role List" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

export { insert, allDataList, getRole, update, listRole };
import { NextFunction } from "express";
import { Response, Request } from "express";
import { encrypt } from "src/common/encrypt";
import { paginationRolePermissionService, updateRolePermissionService } from "src/services/role-permission.service";
const secretKey = process?.env?.SECRET_KEY ?? 'SWS0zf0thg8T5Gz3scOSQ2W4r6r7GJAg';


async function allDataList(req: Request, res: Response, next: NextFunction) {
    try {
        const { roleId } = req.query;
        const query = {
            ROLE_ID: roleId
        }
        let data = await paginationRolePermissionService(query);
        let encryptedData = await encrypt(JSON.stringify(data), secretKey);
        return res.json({ status: true, data: encryptedData, message: "Role Permission List" }); // : encryptedData
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function updatePermission(req: Request, res: Response, next: NextFunction) {
    try {
        const { id: ROLE_ID } = req.params;
        const { permissionId, isCheckd } = req.body;
        const reqBody = {
            ROLE_ID,
            PERMISSION_ID: permissionId,
            IS_CHECKED: isCheckd
        }
        let data = await updateRolePermissionService(reqBody);
        let encryptedData = await encrypt(JSON.stringify(data), secretKey);
        return res.json({ status: true, data: encryptedData, message: "Role Permission Update" }); // : encryptedData
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

export { allDataList, updatePermission };
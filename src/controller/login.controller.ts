import { NextFunction } from "express";
import { Response, Request } from "express";
import { encrypt } from "src/common/encrypt";
import { loginAdminService } from "src/services/login-user.service";
const secretKey = process?.env?.SECRET_KEY ?? 'SWS0zf0thg8T5Gz3scOSQ2W4r6r7GJAg';

async function loginController(req: Request, res: Response, next: NextFunction) {
    try {
        const reqBody = {
            ...req.body
        }
        let data = await loginAdminService(reqBody);
        console.log(data)
        let encryptedData = await encrypt(JSON.stringify(data), secretKey);
        return res.json({ status: true, data: encryptedData, message: "Login successfully" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}




export { loginController };
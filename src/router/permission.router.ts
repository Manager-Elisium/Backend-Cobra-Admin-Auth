import express from "express";
import { allDataList, getPermission, insert, update } from "src/controller/permission.controller";
import { verifyAccessToken } from "src/middleware/auth.token";

let router = express.Router();

// Admin
router.post("/create", verifyAccessToken, insert);
router.get("/paginate/list", verifyAccessToken, allDataList);
router.put("/update/:id", verifyAccessToken, update);
router.get("/get-permission/:id", verifyAccessToken, getPermission);

export { router as PermissionRouter };
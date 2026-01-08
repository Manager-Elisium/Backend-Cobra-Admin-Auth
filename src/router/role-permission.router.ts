import express from "express";
import { allDataList, updatePermission } from "src/controller/role-permission.controller";
import { verifyAccessToken } from "src/middleware/auth.token";

let router = express.Router();

// Admin
router.get("/paginate/list", verifyAccessToken, allDataList);
router.put("/update/:id", verifyAccessToken, updatePermission);

export { router as RolePermissionRouter };
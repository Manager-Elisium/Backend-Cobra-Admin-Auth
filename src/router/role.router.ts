import express from "express";
import { allDataList, getRole, insert, listRole, update } from "src/controller/role.controller";
import { verifyAccessToken } from "src/middleware/auth.token";

let router = express.Router();

// Admin
router.post("/create", verifyAccessToken, insert);
router.get("/paginate/list", verifyAccessToken, allDataList);
router.put("/update/:id", verifyAccessToken, update);
router.get("/get-role/:id", verifyAccessToken, getRole);

router.get('/list', verifyAccessToken, listRole);

export { router as RoleRouter };
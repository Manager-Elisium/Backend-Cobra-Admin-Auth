import express from "express";
import { allDataList, getAdmin, insert, update, updatePassword } from "src/controller/admin-user.controller";
import { verifyAccessToken } from "src/middleware/auth.token";

let router = express.Router();

// Admin
router.post("/create", verifyAccessToken, insert);
router.get("/paginate/list", verifyAccessToken, allDataList);
router.put("/update/:id", verifyAccessToken, update);
router.get("/get-admin/:id", verifyAccessToken, getAdmin);


router.put("/update-password", verifyAccessToken, updatePassword);

export { router as AdminRouter };
import express from "express";
import { allDataList } from "src/controller/admin-activity.controller";
import { verifyAccessToken } from "src/middleware/auth.token";

let router = express.Router();

// Admin
router.post("/paginate/list", verifyAccessToken, allDataList);


export { router as ActivityRouter };
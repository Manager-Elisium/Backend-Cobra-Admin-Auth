import express from "express";
import { dashboardController } from "src/controller/admin-dashboard.controller";
import { verifyAccessToken } from "src/middleware/auth.token";

let router = express.Router();

// Admin
router.get("/report-card", verifyAccessToken, dashboardController);


export { router as DashboardRouter };
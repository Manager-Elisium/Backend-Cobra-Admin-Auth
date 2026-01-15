
import express, { NextFunction, Response, Request } from "express";
let router = express.Router();

import { AdminRouter } from "./router/admin-user.router";
router.use("/register", AdminRouter);
router.use("/admin", AdminRouter);  // Alias for frontend compatibility

import { RoleRouter } from "./router/role.router";
router.use("/role", RoleRouter);

import { PermissionRouter } from "./router/permission.router";
router.use("/permission", PermissionRouter);

import { RolePermissionRouter } from "./router/role-permission.router";
router.use("/role-permission", RolePermissionRouter);

import { LoginRouter } from "./router/login.router";
router.use("/login", LoginRouter);

import { ActivityRouter } from "./router/admin-activity.router";
router.use("/activity", ActivityRouter);

import { DashboardRouter } from "./router/admin-dashboard.router";
router.use("/dashboard", DashboardRouter);

router.use((req: Request, res: Response, next: NextFunction) => {
    next(res.status(404).json({ status: false, message: "Not Found." }));
});

export { router as mainRouter };
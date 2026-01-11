"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = __importDefault(require("express"));
let router = express_1.default.Router();
exports.mainRouter = router;
const admin_user_router_1 = require("./router/admin-user.router");
router.use("/register", admin_user_router_1.AdminRouter);
const role_router_1 = require("./router/role.router");
router.use("/role", role_router_1.RoleRouter);
const permission_router_1 = require("./router/permission.router");
router.use("/permission", permission_router_1.PermissionRouter);
const role_permission_router_1 = require("./router/role-permission.router");
router.use("/role-permission", role_permission_router_1.RolePermissionRouter);
const login_router_1 = require("./router/login.router");
router.use("/login", login_router_1.LoginRouter);
const admin_activity_router_1 = require("./router/admin-activity.router");
router.use("/activity", admin_activity_router_1.ActivityRouter);
const admin_dashboard_router_1 = require("./router/admin-dashboard.router");
router.use("/dashboard", admin_dashboard_router_1.DashboardRouter);
router.use((req, res, next) => {
    next(res.status(404).json({ status: false, message: "Not Found." }));
});
//# sourceMappingURL=init.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardRouter = void 0;
const express_1 = __importDefault(require("express"));
const admin_dashboard_controller_1 = require("src/controller/admin-dashboard.controller");
const auth_token_1 = require("src/middleware/auth.token");
let router = express_1.default.Router();
exports.DashboardRouter = router;
// Admin
router.get("/report-card", auth_token_1.verifyAccessToken, admin_dashboard_controller_1.dashboardController);
//# sourceMappingURL=admin-dashboard.router.js.map
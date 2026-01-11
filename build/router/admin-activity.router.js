"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityRouter = void 0;
const express_1 = __importDefault(require("express"));
const admin_activity_controller_1 = require("src/controller/admin-activity.controller");
const auth_token_1 = require("src/middleware/auth.token");
let router = express_1.default.Router();
exports.ActivityRouter = router;
// Admin
router.post("/paginate/list", auth_token_1.verifyAccessToken, admin_activity_controller_1.allDataList);
//# sourceMappingURL=admin-activity.router.js.map
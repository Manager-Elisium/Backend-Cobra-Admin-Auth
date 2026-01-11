"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = void 0;
const express_1 = __importDefault(require("express"));
const admin_user_controller_1 = require("src/controller/admin-user.controller");
const auth_token_1 = require("src/middleware/auth.token");
let router = express_1.default.Router();
exports.AdminRouter = router;
// Admin
router.post("/create", auth_token_1.verifyAccessToken, admin_user_controller_1.insert);
router.get("/paginate/list", auth_token_1.verifyAccessToken, admin_user_controller_1.allDataList);
router.put("/update/:id", auth_token_1.verifyAccessToken, admin_user_controller_1.update);
router.get("/get-admin/:id", auth_token_1.verifyAccessToken, admin_user_controller_1.getAdmin);
router.put("/update-password", auth_token_1.verifyAccessToken, admin_user_controller_1.updatePassword);
//# sourceMappingURL=admin-user.router.js.map
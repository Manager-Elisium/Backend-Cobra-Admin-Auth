"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionRouter = void 0;
const express_1 = __importDefault(require("express"));
const role_permission_controller_1 = require("src/controller/role-permission.controller");
const auth_token_1 = require("src/middleware/auth.token");
let router = express_1.default.Router();
exports.RolePermissionRouter = router;
// Admin
router.get("/paginate/list", auth_token_1.verifyAccessToken, role_permission_controller_1.allDataList);
router.put("/update/:id", auth_token_1.verifyAccessToken, role_permission_controller_1.updatePermission);
//# sourceMappingURL=role-permission.router.js.map
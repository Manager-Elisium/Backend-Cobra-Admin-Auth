"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionRouter = void 0;
const express_1 = __importDefault(require("express"));
const permission_controller_1 = require("src/controller/permission.controller");
const auth_token_1 = require("src/middleware/auth.token");
let router = express_1.default.Router();
exports.PermissionRouter = router;
// Admin
router.post("/create", auth_token_1.verifyAccessToken, permission_controller_1.insert);
router.get("/paginate/list", auth_token_1.verifyAccessToken, permission_controller_1.allDataList);
router.put("/update/:id", auth_token_1.verifyAccessToken, permission_controller_1.update);
router.get("/get-permission/:id", auth_token_1.verifyAccessToken, permission_controller_1.getPermission);
//# sourceMappingURL=permission.router.js.map
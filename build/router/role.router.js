"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRouter = void 0;
const express_1 = __importDefault(require("express"));
const role_controller_1 = require("src/controller/role.controller");
const auth_token_1 = require("src/middleware/auth.token");
let router = express_1.default.Router();
exports.RoleRouter = router;
// Admin
router.post("/create", auth_token_1.verifyAccessToken, role_controller_1.insert);
router.get("/paginate/list", auth_token_1.verifyAccessToken, role_controller_1.allDataList);
router.put("/update/:id", auth_token_1.verifyAccessToken, role_controller_1.update);
router.get("/get-role/:id", auth_token_1.verifyAccessToken, role_controller_1.getRole);
router.get('/list', auth_token_1.verifyAccessToken, role_controller_1.listRole);
//# sourceMappingURL=role.router.js.map
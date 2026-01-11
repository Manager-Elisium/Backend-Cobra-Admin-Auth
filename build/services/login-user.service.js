"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdminService = loginAdminService;
const standard_error_1 = __importDefault(require("src/common/standard-error"));
const error_type_1 = require("src/common/error-type");
const admin_user_repository_1 = require("src/repository/admin-user.repository");
const role_permission_service_1 = require("./role-permission.service");
const auth_token_1 = require("src/middleware/auth.token");
function loginAdminService(admin) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const { EMAIL, PASSWORD } = admin;
        const query = {
            where: { EMAIL },
            relations: ['ROLE_ID']
        };
        const getUser = yield (0, admin_user_repository_1.getOneById)(query);
        if ((getUser === null || getUser === void 0 ? void 0 : getUser.PASSWORD) !== PASSWORD) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Password must be match.");
        }
        const tokenBody = {
            EMAIL,
            ADMIN_ID: getUser === null || getUser === void 0 ? void 0 : getUser.ID,
            ROLE_ID: (_a = getUser === null || getUser === void 0 ? void 0 : getUser.ROLE_ID) === null || _a === void 0 ? void 0 : _a.ID,
            ROLE_NAME: (_b = getUser === null || getUser === void 0 ? void 0 : getUser.ROLE_ID) === null || _b === void 0 ? void 0 : _b.NAME
        };
        const authToken = yield (0, auth_token_1.signAccessToken)(tokenBody);
        const permissionList = yield (0, role_permission_service_1.paginationRolePermissionService)({ ROLE_ID: (_c = getUser === null || getUser === void 0 ? void 0 : getUser.ROLE_ID) === null || _c === void 0 ? void 0 : _c.ID });
        return {
            authToken, email: EMAIL, permissionList: ((_d = getUser === null || getUser === void 0 ? void 0 : getUser.ROLE_ID) === null || _d === void 0 ? void 0 : _d.NAME) === "SUPER_ADMIN" ?
                permissionList === null || permissionList === void 0 ? void 0 : permissionList.map((data) => ({
                    NAME: data.NAME,
                    SLUG: data.SLUG
                })) : permissionList === null || permissionList === void 0 ? void 0 : permissionList.filter((isChecked) => isChecked.IS_CHECKED).map((data) => ({
                NAME: data.NAME,
                SLUG: data.SLUG
            }))
        };
    });
}
//# sourceMappingURL=login-user.service.js.map
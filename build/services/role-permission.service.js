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
exports.paginationRolePermissionService = paginationRolePermissionService;
exports.updateRolePermissionService = updateRolePermissionService;
const standard_error_1 = __importDefault(require("src/common/standard-error"));
const error_type_1 = require("src/common/error-type");
const role_permission_repository_1 = require("src/repository/role-permission.repository");
const permission_repository_1 = require("src/repository/permission.repository");
function paginationRolePermissionService(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = {
            where: [
                { ROLE_ID: body.ROLE_ID }
            ],
            relations: ['PERMISSION_ID']
        };
        const permissionQuery = {
            where: { IS_ACTIVE: true }
        };
        const allPermission = yield (0, permission_repository_1.listPermission)(permissionQuery);
        const currentPermission = yield (0, role_permission_repository_1.listRolesPermissionByRoleID)(query);
        if (!currentPermission) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Role Permission Found Error.");
        }
        const data = allPermission === null || allPermission === void 0 ? void 0 : allPermission.map((permission) => {
            // console.log(currentPermission)
            const getPermission = currentPermission.find((user) => user.PERMISSION_ID.ID === permission.ID);
            // console.log(getPermission)
            if (getPermission) {
                return Object.assign(Object.assign({}, permission), { IS_CHECKED: true });
            }
            else {
                return Object.assign(Object.assign({}, permission), { IS_CHECKED: false });
            }
        });
        return data;
    });
}
function updateRolePermissionService(body) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { IS_CHECKED, ROLE_ID, PERMISSION_ID } = body;
        if (IS_CHECKED) {
            const query = {
                where: {
                    ROLE_ID: ROLE_ID,
                    PERMISSION_ID: PERMISSION_ID
                }
            };
            let updateResult = yield (0, role_permission_repository_1.getOneRolesPermissionById)(query);
            if (!updateResult) {
                const insertQuery = yield (0, role_permission_repository_1.insertRolesPermission)({ ROLE_ID, PERMISSION_ID });
                return insertQuery;
            }
            return updateResult;
        }
        else {
            const query = {
                where: {
                    ROLE_ID: ROLE_ID,
                    PERMISSION_ID: PERMISSION_ID
                }
            };
            let updateResult = yield (0, role_permission_repository_1.getOneRolesPermissionById)(query);
            if (!updateResult) {
                throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Role Permission is not present.");
            }
            const deleteResult = yield (0, role_permission_repository_1.deleteRolesPermissionAndReturnById)({ ROLE_ID, PERMISSION_ID });
            if (!deleteResult) {
                throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Role Permission is not deleted.");
            }
            return (_a = deleteResult === null || deleteResult === void 0 ? void 0 : deleteResult.raw) === null || _a === void 0 ? void 0 : _a[0];
        }
    });
}
//# sourceMappingURL=role-permission.service.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRolesPermission = listRolesPermission;
exports.updateRolesPermissionAndReturnById = updateRolesPermissionAndReturnById;
exports.insertRolesPermission = insertRolesPermission;
exports.getOneRolesPermissionById = getOneRolesPermissionById;
exports.deleteRolesPermissionAndReturnById = deleteRolesPermissionAndReturnById;
exports.listRolesPermissionByRoleID = listRolesPermissionByRoleID;
const role_permission_entity_1 = require("src/domain/role-permission.entity");
function insertRolesPermission(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield role_permission_entity_1.RolesPermission.save(data);
    });
}
function listRolesPermission(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield role_permission_entity_1.RolesPermission.findAndCount(query);
    });
}
function getOneRolesPermissionById(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield role_permission_entity_1.RolesPermission.findOne(query);
    });
}
function updateRolesPermissionAndReturnById(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield role_permission_entity_1.RolesPermission
            .createQueryBuilder()
            .update(role_permission_entity_1.RolesPermission)
            .set(Object.assign({}, data))
            .where("ID = :id", { id })
            .returning('*')
            .execute();
    });
}
function deleteRolesPermissionAndReturnById(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield role_permission_entity_1.RolesPermission
            .createQueryBuilder()
            .delete()
            .where("ROLE_ID = :roleId AND PERMISSION_ID = :permissionId", {
            roleId: data.ROLE_ID,
            permissionId: data.PERMISSION_ID
        })
            .returning('*')
            .execute();
    });
}
function listRolesPermissionByRoleID(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield role_permission_entity_1.RolesPermission.find(query); // relations: ['BENEFITS']
    });
}
//# sourceMappingURL=role-permission.repository.js.map
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
exports.insertPermission = insertPermission;
exports.countPermission = countPermission;
exports.listPermissionPagination = listPermissionPagination;
exports.getOnePermissionById = getOnePermissionById;
exports.updatePermissionAndReturnById = updatePermissionAndReturnById;
exports.listPermission = listPermission;
const permission_entity_1 = require("src/domain/permission.entity");
function insertPermission(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield permission_entity_1.Permission.save(data);
    });
}
function countPermission(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield permission_entity_1.Permission.count(query);
    });
}
function listPermissionPagination(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield permission_entity_1.Permission.findAndCount(query);
    });
}
function getOnePermissionById(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield permission_entity_1.Permission.findOne(query);
    });
}
function updatePermissionAndReturnById(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield permission_entity_1.Permission
            .createQueryBuilder()
            .update(permission_entity_1.Permission)
            .set(Object.assign({}, data))
            .where("ID = :id", { id })
            .returning('*')
            .execute();
    });
}
function listPermission(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield permission_entity_1.Permission.find(query);
    });
}
//# sourceMappingURL=permission.repository.js.map
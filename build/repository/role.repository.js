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
exports.insertOneRole = insertOneRole;
exports.findAllRole = findAllRole;
exports.allRole = allRole;
exports.countRole = countRole;
exports.getOneRoleById = getOneRoleById;
exports.updateRoleAndReturnById = updateRoleAndReturnById;
const role_entity_1 = require("src/domain/role.entity");
function insertOneRole(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield role_entity_1.Role.save(data);
    });
}
function countRole(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield role_entity_1.Role.count(query);
    });
}
function findAllRole(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield role_entity_1.Role.findAndCount(query);
    });
}
function allRole(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield role_entity_1.Role.find(query);
    });
}
function getOneRoleById(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield role_entity_1.Role.findOne(query);
    });
}
function updateRoleAndReturnById(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield role_entity_1.Role
            .createQueryBuilder()
            .update(role_entity_1.Role)
            .set(Object.assign({}, data))
            .where("ID = :id", { id })
            .returning('*')
            .execute();
    });
}
//# sourceMappingURL=role.repository.js.map
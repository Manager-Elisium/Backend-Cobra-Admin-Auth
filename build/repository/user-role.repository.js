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
exports.insertUsersRoles = insertUsersRoles;
exports.listUsersRoles = listUsersRoles;
exports.getOneUsersRolesById = getOneUsersRolesById;
exports.updateUsersRolesAndReturnById = updateUsersRolesAndReturnById;
const user_role_entity_1 = require("src/domain/user-role.entity");
function insertUsersRoles(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_role_entity_1.UsersRoles.save(data);
    });
}
function listUsersRoles(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_role_entity_1.UsersRoles.findAndCount(query); // relations: ['BENEFITS']
    });
}
function getOneUsersRolesById(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_role_entity_1.UsersRoles.findOne(query);
    });
}
function updateUsersRolesAndReturnById(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_role_entity_1.UsersRoles
            .createQueryBuilder()
            .update(user_role_entity_1.UsersRoles)
            .set(Object.assign({}, data))
            .where("ID = :id", { id })
            .returning('*')
            .execute();
    });
}
//# sourceMappingURL=user-role.repository.js.map
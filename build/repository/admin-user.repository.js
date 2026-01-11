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
exports.insertOne = insertOne;
exports.countAdmin = countAdmin;
exports.findAll = findAll;
exports.getOneById = getOneById;
exports.updateAndReturnById = updateAndReturnById;
exports.deleteAndReturnById = deleteAndReturnById;
const admin_user_entity_1 = require("src/domain/admin-user.entity");
function insertOne(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield admin_user_entity_1.AdminUser.save(data);
    });
}
function countAdmin(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield admin_user_entity_1.AdminUser.count(query);
    });
}
function findAll(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield admin_user_entity_1.AdminUser.findAndCount(query);
    });
}
function getOneById(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield admin_user_entity_1.AdminUser.findOne(query);
    });
}
function updateAndReturnById(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield admin_user_entity_1.AdminUser
            .createQueryBuilder()
            .update(admin_user_entity_1.AdminUser)
            .set(Object.assign({}, data))
            .where("ID = :id", { id })
            .returning('*')
            .execute();
    });
}
function deleteAndReturnById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield admin_user_entity_1.AdminUser
            .createQueryBuilder()
            .delete()
            .where("ID = :id", { id })
            .returning('*')
            .execute();
    });
}
//# sourceMappingURL=admin-user.repository.js.map
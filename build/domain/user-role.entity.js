"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoles = void 0;
const typeorm_1 = require("typeorm");
const admin_user_entity_1 = require("./admin-user.entity");
const role_entity_1 = require("./role.entity");
let UsersRoles = class UsersRoles extends typeorm_1.BaseEntity {
};
exports.UsersRoles = UsersRoles;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'uuid' }),
    (0, typeorm_1.ManyToOne)(() => admin_user_entity_1.AdminUser, user => user.ID),
    (0, typeorm_1.JoinColumn)({ name: 'USER_ID' }),
    __metadata("design:type", admin_user_entity_1.AdminUser)
], UsersRoles.prototype, "USER_ID", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'uuid' }),
    (0, typeorm_1.ManyToOne)(() => role_entity_1.Role, role => role.ID),
    (0, typeorm_1.JoinColumn)({ name: 'ROLE_ID' }),
    __metadata("design:type", role_entity_1.Role)
], UsersRoles.prototype, "ROLE_ID", void 0);
exports.UsersRoles = UsersRoles = __decorate([
    (0, typeorm_1.Entity)({ name: "USER_ROLE" })
], UsersRoles);
//# sourceMappingURL=user-role.entity.js.map
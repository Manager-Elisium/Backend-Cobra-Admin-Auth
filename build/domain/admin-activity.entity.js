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
exports.AdminActivity = exports.Module = void 0;
const typeorm_1 = require("typeorm");
const admin_user_entity_1 = require("./admin-user.entity");
var Module;
(function (Module) {
    Module["LOBBY"] = "Lobby";
    Module["SEASON"] = "Season";
    Module["SEASON_REWARD"] = "Season Reward";
    Module["DAILY_REWARD"] = "Daily Reward";
    Module["DAILY_MISSION"] = "Daily Mission";
    Module["VIP_CARD"] = "Vip Card";
    Module["VIP_CARD_BENEFIT"] = "Vip Card Benefit";
    Module["SHOP"] = "Shop";
    Module["ACHIEVEMENT"] = "Achievement";
    Module["BADGE"] = "Badge";
    Module["NOTIFICATION"] = "Notification";
    Module["GAME"] = "Game";
    Module["GAMES_SETTING"] = "Games Setting";
    Module["BUG_REPORT"] = "Bug Report";
    Module["PERMISSION"] = "Permission";
    Module["ROLE_PERMISSION"] = "Role Permission";
})(Module || (exports.Module = Module = {}));
let AdminActivity = class AdminActivity extends typeorm_1.BaseEntity {
};
exports.AdminActivity = AdminActivity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "ID" }),
    __metadata("design:type", String)
], AdminActivity.prototype, "ID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => admin_user_entity_1.AdminUser, (admin) => admin.ADMIN_ID, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'ADMIN_ID' }),
    __metadata("design:type", admin_user_entity_1.AdminUser)
], AdminActivity.prototype, "ADMIN_ID", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: Module, nullable: false }),
    __metadata("design:type", String)
], AdminActivity.prototype, "MODULE", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AdminActivity.prototype, "ACTION", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], AdminActivity.prototype, "CREATED_DATE", void 0);
exports.AdminActivity = AdminActivity = __decorate([
    (0, typeorm_1.Entity)({ name: "ADMIN_ACTIVITY" })
], AdminActivity);
//# sourceMappingURL=admin-activity.entity.js.map
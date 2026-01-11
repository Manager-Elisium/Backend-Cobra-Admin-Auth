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
exports.AdminDashboard = void 0;
const typeorm_1 = require("typeorm");
let AdminDashboard = class AdminDashboard extends typeorm_1.BaseEntity {
};
exports.AdminDashboard = AdminDashboard;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "ID" }),
    __metadata("design:type", String)
], AdminDashboard.prototype, "ID", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], AdminDashboard.prototype, "PLAYER_LOGIN_IN", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], AdminDashboard.prototype, "TOTAL_USER", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], AdminDashboard.prototype, "AVERAGE_PLAYER_ACTIVE_TIME", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], AdminDashboard.prototype, "GUEST_PLAYERS_SIGNED_UP", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], AdminDashboard.prototype, "PLAYERS_COLLECTED_REWARDS", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], AdminDashboard.prototype, "NEW_PLAYERS_SIGNED_UP", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], AdminDashboard.prototype, "SEASON_PASS_PURCHASES", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], AdminDashboard.prototype, "UNRESOLVED_REPORT", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], AdminDashboard.prototype, "RESOLVED_REPORT", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], AdminDashboard.prototype, "PLAYERS_PLAYED_2P", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], AdminDashboard.prototype, "PLAYERS_PLAYED_3P", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], AdminDashboard.prototype, "PLAYERS_PLAYED_4P", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], AdminDashboard.prototype, "PLAYERS_SHOP_PURCHASED_GOLD_COINS", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], AdminDashboard.prototype, "PLAYERS_SHOP_PURCHASED_DIAMONDS", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], AdminDashboard.prototype, "PLAYERS_SHOP_PURCHASED_ITEMS", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], AdminDashboard.prototype, "CREATED_DATE", void 0);
exports.AdminDashboard = AdminDashboard = __decorate([
    (0, typeorm_1.Entity)({ name: "ADMIN_DASHBOARD" })
], AdminDashboard);
//# sourceMappingURL=admin-dashboard.entity.js.map
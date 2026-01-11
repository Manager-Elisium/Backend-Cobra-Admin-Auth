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
exports.activityList = activityList;
const admin_activity_entity_1 = require("src/domain/admin-activity.entity");
const typeorm_1 = require("typeorm");
function activityList(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield admin_activity_entity_1.AdminActivity.findAndCount({
            where: [
                {
                    CREATED_DATE: (0, typeorm_1.Between)(data.startDate, data.endDate),
                    MODULE: data.MODULE,
                    ADMIN_ID: {
                        ROLE_ID: {
                            ID: data.ROLE_ID
                        }
                    }
                }
            ],
            take: data.take,
            skip: data.skip,
            relations: ['ADMIN_ID']
        });
    });
}
//# sourceMappingURL=admin-activity.repository.js.map
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
exports.createAdminService = createAdminService;
exports.paginationAdminService = paginationAdminService;
exports.findOneAdminService = findOneAdminService;
exports.updateAdminService = updateAdminService;
exports.updatePasswordAdminService = updatePasswordAdminService;
const standard_error_1 = __importDefault(require("src/common/standard-error"));
const error_type_1 = require("src/common/error-type");
const admin_user_repository_1 = require("src/repository/admin-user.repository");
function createAdminService(admin) {
    return __awaiter(this, void 0, void 0, function* () {
        const { EMAIL } = admin;
        const query = {
            where: { EMAIL }
        };
        const isAvalible = yield (0, admin_user_repository_1.countAdmin)(query);
        if (isAvalible) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Email already exists.");
        }
        const createOne = yield (0, admin_user_repository_1.insertOne)(admin);
        if (!createOne) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Admin create Error.");
        }
        // Old Part
        // let insertRole = await insertUsersRoles({ USER_ID: createOne.ID, ROLE_ID: ROLE_ID } as unknown as UsersRoles)
        // if (!insertRole) {
        //     await deleteAndReturnById(createOne.ID);
        //     throw new StandardError(
        //         ErrorCodes.API_VALIDATION_ERROR,
        //         "Admin create Error."
        //     );
        // }
        return createOne;
    });
}
function paginationAdminService(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = {
            order: { CREATED_DATE: 'DESC' },
            take: body.take,
            skip: (body.page - 1) * body.take,
            relations: ['ROLE_ID']
        };
        const data = yield (0, admin_user_repository_1.findAll)(query);
        if (!data) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Admin list Found Error.");
        }
        const list = data === null || data === void 0 ? void 0 : data[0];
        return { data: list, count: data === null || data === void 0 ? void 0 : data[1] };
    });
}
function findOneAdminService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = {
            where: {
                ID: id
            },
            relations: ['ROLE_ID']
        };
        const getAdmin = yield (0, admin_user_repository_1.getOneById)(query);
        if (!getAdmin) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Admin User is not found.");
        }
        return getAdmin;
    });
}
function updateAdminService(id, admin) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        let updateAdmin = yield (0, admin_user_repository_1.updateAndReturnById)(id, admin);
        if (!(updateAdmin === null || updateAdmin === void 0 ? void 0 : updateAdmin.affected)) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Admin is not found.");
        }
        return (_a = updateAdmin === null || updateAdmin === void 0 ? void 0 : updateAdmin.raw) === null || _a === void 0 ? void 0 : _a[0];
    });
}
function updatePasswordAdminService(id, admin) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (admin.NEW_PASSWORD === admin.OLD_PASSWORD) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Old Password and New Password must be differnt.");
        }
        const query = {
            where: {
                ID: id
            }
        };
        const getAdmin = yield (0, admin_user_repository_1.getOneById)(query);
        if (!getAdmin) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Admin User is not found.");
        }
        if (getAdmin.PASSWORD !== admin.OLD_PASSWORD) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Old Password is not match.");
        }
        const updatePass = {
            PASSWORD: admin.NEW_PASSWORD
        };
        let updateAdmin = yield (0, admin_user_repository_1.updateAndReturnById)(id, updatePass);
        if (!(updateAdmin === null || updateAdmin === void 0 ? void 0 : updateAdmin.affected)) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Admin User is not update.");
        }
        return (_a = updateAdmin === null || updateAdmin === void 0 ? void 0 : updateAdmin.raw) === null || _a === void 0 ? void 0 : _a[0];
    });
}
//# sourceMappingURL=admin-user.service.js.map
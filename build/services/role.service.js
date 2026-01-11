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
exports.createRoleService = createRoleService;
exports.paginationRoleService = paginationRoleService;
exports.findOneRoleService = findOneRoleService;
exports.updateRoleService = updateRoleService;
exports.listRoleService = listRoleService;
const standard_error_1 = __importDefault(require("src/common/standard-error"));
const error_type_1 = require("src/common/error-type");
const role_repository_1 = require("src/repository/role.repository");
function createRoleService(role) {
    return __awaiter(this, void 0, void 0, function* () {
        const { NAME } = role;
        const query = {
            where: { NAME }
        };
        const isAvalible = yield (0, role_repository_1.countRole)(query);
        if (isAvalible) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Role already exists.");
        }
        const createOne = yield (0, role_repository_1.insertOneRole)(role);
        if (!createOne) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Role create Error.");
        }
        return createOne;
    });
}
function paginationRoleService(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = {
            order: { CREATED_DATE: 'DESC' },
            take: body.take,
            skip: (body.page - 1) * body.take
        };
        const data = yield (0, role_repository_1.findAllRole)(query);
        if (!data) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Role Found Error.");
        }
        const list = data === null || data === void 0 ? void 0 : data[0];
        return { data: list, count: data === null || data === void 0 ? void 0 : data[1] };
    });
}
function findOneRoleService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = {
            where: {
                ID: id
            }
        };
        const getAdmin = yield (0, role_repository_1.getOneRoleById)(query);
        if (!getAdmin) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Role is not found.");
        }
        return getAdmin;
    });
}
function updateRoleService(id, admin) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        let updateAdmin = yield (0, role_repository_1.updateRoleAndReturnById)(id, admin);
        if (!(updateAdmin === null || updateAdmin === void 0 ? void 0 : updateAdmin.affected)) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Role is not found.");
        }
        return (_a = updateAdmin === null || updateAdmin === void 0 ? void 0 : updateAdmin.raw) === null || _a === void 0 ? void 0 : _a[0];
    });
}
function listRoleService() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = {
            where: {
                IS_ACTIVE: true
            }
        };
        const data = yield (0, role_repository_1.allRole)(query);
        if (!data) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Role Found Error.");
        }
        return data;
    });
}
//# sourceMappingURL=role.service.js.map
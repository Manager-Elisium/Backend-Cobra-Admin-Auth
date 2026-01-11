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
exports.createPermissionService = createPermissionService;
exports.paginationPermissionService = paginationPermissionService;
exports.findOnePermissionService = findOnePermissionService;
exports.updatePermissionService = updatePermissionService;
const standard_error_1 = __importDefault(require("src/common/standard-error"));
const error_type_1 = require("src/common/error-type");
const permission_repository_1 = require("src/repository/permission.repository");
function createPermissionService(permission) {
    return __awaiter(this, void 0, void 0, function* () {
        const { SLUG } = permission;
        const query = {
            where: { SLUG }
        };
        const isAvalible = yield (0, permission_repository_1.countPermission)(query);
        if (isAvalible) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Permission already exists.");
        }
        const createOne = yield (0, permission_repository_1.insertPermission)(permission);
        if (!createOne) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Permission create Error.");
        }
        return createOne;
    });
}
function paginationPermissionService(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = {
            order: { CREATED_DATE: 'DESC' },
            take: body.take,
            skip: (body.page - 1) * body.take
        };
        const data = yield (0, permission_repository_1.listPermissionPagination)(query);
        if (!data) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Permission Found Error.");
        }
        const list = data === null || data === void 0 ? void 0 : data[0];
        return { data: list, count: data === null || data === void 0 ? void 0 : data[1] };
    });
}
function findOnePermissionService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = {
            where: {
                ID: id
            }
        };
        const getAdmin = yield (0, permission_repository_1.getOnePermissionById)(query);
        if (!getAdmin) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Permission is not found.");
        }
        return getAdmin;
    });
}
function updatePermissionService(id, admin) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        let updateAdmin = yield (0, permission_repository_1.updatePermissionAndReturnById)(id, admin);
        if (!(updateAdmin === null || updateAdmin === void 0 ? void 0 : updateAdmin.affected)) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Permission is not found.");
        }
        return (_a = updateAdmin === null || updateAdmin === void 0 ? void 0 : updateAdmin.raw) === null || _a === void 0 ? void 0 : _a[0];
    });
}
//# sourceMappingURL=permission.service.js.map
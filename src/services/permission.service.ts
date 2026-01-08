import { DeleteResult, UpdateResult } from 'typeorm';
import StandardError from 'src/common/standard-error';
import { ErrorCodes } from 'src/common/error-type';
import { Permission } from 'src/domain/permission.entity';
import { countPermission, listPermissionPagination, getOnePermissionById, insertPermission, updatePermissionAndReturnById } from 'src/repository/permission.repository';


async function createPermissionService(permission: Permission): Promise<Permission> {
    const { SLUG } = permission;
    const query = {
        where: { SLUG }
    }
    const isAvalible = await countPermission(query);

    if (isAvalible) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Permission already exists."
        );
    }
    const createOne = await insertPermission(permission);
    if (!createOne) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Permission create Error."
        );
    }
    return createOne;
}

async function paginationPermissionService(body: any): Promise<{ data: Permission[], count: number }> {
    const query = {
        order: { CREATED_DATE: 'DESC' },
        take: body.take,
        skip: (body.page - 1) * body.take
    };
    const data = await listPermissionPagination(query) as any;
    if (!data) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Permission Found Error."
        );
    }
    const list = data?.[0];
    return { data: list, count: data?.[1] };
}

async function findOnePermissionService(id: string): Promise<Permission> {
    const query = {
        where: {
            ID: id
        }
    };
    const getAdmin = await getOnePermissionById(query) as any;
    if (!getAdmin) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Permission is not found."
        );
    }
    return getAdmin;
}


async function updatePermissionService(id: string, admin: Permission): Promise<UpdateResult> {
    let updateAdmin = await updatePermissionAndReturnById(id, admin);
    if (!updateAdmin?.affected) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Permission is not found."
        );
    }
    return updateAdmin?.raw?.[0];
}

export {
    createPermissionService, paginationPermissionService,
    findOnePermissionService, updatePermissionService
};
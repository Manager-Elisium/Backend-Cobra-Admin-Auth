import { DeleteResult, UpdateResult } from 'typeorm';
import StandardError from 'src/common/standard-error';
import { ErrorCodes } from 'src/common/error-type';
import { Role } from 'src/domain/role.entity';
import { allRole, countRole, findAllRole, getOneRoleById, insertOneRole, updateRoleAndReturnById } from 'src/repository/role.repository';


async function createRoleService(role: Role): Promise<Role> {
    const { NAME } = role;
    const query = {
        where: { NAME }
    }
    const isAvalible = await countRole(query);

    if (isAvalible) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Role already exists."
        );
    }
    const createOne = await insertOneRole(role);
    if (!createOne) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Role create Error."
        );
    }
    return createOne;
}

async function paginationRoleService(body: any): Promise<{ data: Role[], count: number }> {
    const query = {
        order: { CREATED_DATE: 'DESC' },
        take: body.take,
        skip: (body.page - 1) * body.take
    };
    const data = await findAllRole(query) as any;
    if (!data) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Role Found Error."
        );
    }
    const list = data?.[0];
    return { data: list, count: data?.[1] };
}

async function findOneRoleService(id: string): Promise<Role> {
    const query = {
        where: {
            ID: id
        }
    };
    const getAdmin = await getOneRoleById(query) as any;
    if (!getAdmin) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Role is not found."
        );
    }
    return getAdmin;
}


async function updateRoleService(id: string, admin: Role): Promise<UpdateResult> {
    let updateAdmin = await updateRoleAndReturnById(id, admin);
    if (!updateAdmin?.affected) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Role is not found."
        );
    }
    return updateAdmin?.raw?.[0];
}


async function listRoleService(): Promise<{ data: Role[]}> {
    const query = {
        where: {
            IS_ACTIVE: true
        }
    };
    const data = await allRole(query) as any;
    if (!data) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Role Found Error."
        );
    }
    return data;
}

export {
    createRoleService, paginationRoleService,
    findOneRoleService, updateRoleService, listRoleService
};
import { UpdateResult } from 'typeorm';
import StandardError from 'src/common/standard-error';
import { ErrorCodes } from 'src/common/error-type';
import { AdminUser } from 'src/domain/admin-user.entity';
import { countAdmin, deleteAndReturnById, findAll, getOneById, insertOne, updateAndReturnById } from 'src/repository/admin-user.repository';




async function createAdminService(admin: AdminUser): Promise<AdminUser> {
    const { EMAIL } = admin;
    const query = {
        where: { EMAIL }
    }
    const isAvalible = await countAdmin(query);

    if (isAvalible) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Email already exists."
        );
    }

    const createOne = await insertOne(admin);
    if (!createOne) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Admin create Error."
        );
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
}

async function paginationAdminService(body: any): Promise<{ data: AdminUser[], count: number }> {
    const query = {
        order: { CREATED_DATE: 'DESC' },
        take: body.take,
        skip: (body.page - 1) * body.take,
        relations: ['ROLE_ID']
    };
    const data = await findAll(query) as any;
    if (!data) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Admin list Found Error."
        );
    }
    const list = data?.[0];
    return { data: list, count: data?.[1] };
}

async function findOneAdminService(id: string): Promise<AdminUser> {
    const query = {
        where: {
            ID: id
        },
        relations: ['ROLE_ID']
    };
    const getAdmin = await getOneById(query) as any;
    if (!getAdmin) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Admin User is not found."
        );
    }
    return getAdmin;
}


async function updateAdminService(id: string, admin: AdminUser): Promise<UpdateResult> {
    let updateAdmin = await updateAndReturnById(id, admin);
    if (!updateAdmin?.affected) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Admin is not found."
        );
    }
    return updateAdmin?.raw?.[0];
}


async function updatePasswordAdminService(id: string, admin: any): Promise<UpdateResult> {
    if (admin.NEW_PASSWORD === admin.OLD_PASSWORD) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Old Password and New Password must be differnt."
        );
    }
    const query = {
        where: {
            ID: id
        }
    };
    const getAdmin = await getOneById(query) as any;
    if (!getAdmin) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Admin User is not found."
        );
    }
    if (getAdmin.PASSWORD !== admin.OLD_PASSWORD) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Old Password is not match."
        );
    }
    const updatePass = {
        PASSWORD: admin.NEW_PASSWORD
    } as AdminUser;
    let updateAdmin = await updateAndReturnById(id, updatePass);
    if (!updateAdmin?.affected) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Admin User is not update."
        );
    }
    return updateAdmin?.raw?.[0];
}

export {
    createAdminService, paginationAdminService,
    findOneAdminService, updateAdminService,
    updatePasswordAdminService
};
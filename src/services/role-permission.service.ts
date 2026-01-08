import StandardError from 'src/common/standard-error';
import { ErrorCodes } from 'src/common/error-type';
import { deleteRolesPermissionAndReturnById, getOneRolesPermissionById, insertRolesPermission, listRolesPermission, listRolesPermissionByRoleID } from 'src/repository/role-permission.repository';
import { listPermission } from 'src/repository/permission.repository';
import { RolesPermission } from 'src/domain/role-permission.entity';


async function paginationRolePermissionService(body: any) {
    const query = {
        where: [
            { ROLE_ID: body.ROLE_ID }
        ],
        relations: ['PERMISSION_ID']
    }
    const permissionQuery = {
        where: { IS_ACTIVE: true }
    }
    const allPermission = await listPermission(permissionQuery);
    const currentPermission = await listRolesPermissionByRoleID(query) as any;
    if (!currentPermission) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Role Permission Found Error."
        );
    }
    const data = allPermission?.map((permission) => {
        // console.log(currentPermission)
        const getPermission = currentPermission.find((user) => user.PERMISSION_ID.ID === permission.ID);
        // console.log(getPermission)
        if (getPermission) {
            return {
                ...permission,
                IS_CHECKED: true
            }
        } else {
            return {
                ...permission,
                IS_CHECKED: false
            }
        }
    });
    return data;
}


async function updateRolePermissionService(body: any) {
    const { IS_CHECKED, ROLE_ID, PERMISSION_ID } = body;

    if (IS_CHECKED) {
        const query = {
            where: { 
                ROLE_ID: ROLE_ID, 
                PERMISSION_ID: PERMISSION_ID 
            }
        }
        let updateResult = await getOneRolesPermissionById(query);
        if (!updateResult) {
            const insertQuery = await insertRolesPermission({ ROLE_ID, PERMISSION_ID } as RolesPermission);
            return insertQuery;
        }
        return updateResult;
    } else {
        const query = {
            where: { 
                ROLE_ID: ROLE_ID, 
                PERMISSION_ID: PERMISSION_ID 
            }
        }
        let updateResult = await getOneRolesPermissionById(query);
        if (!updateResult) {
            throw new StandardError(
                ErrorCodes.API_VALIDATION_ERROR,
                "Role Permission is not present."
            );
        }
        const deleteResult = await deleteRolesPermissionAndReturnById({ ROLE_ID, PERMISSION_ID } as RolesPermission);

        if (!deleteResult) {
            throw new StandardError(
                ErrorCodes.API_VALIDATION_ERROR,
                "Role Permission is not deleted."
            );
        }

        return deleteResult?.raw?.[0];
    }
}





export {
    paginationRolePermissionService,
    updateRolePermissionService
};
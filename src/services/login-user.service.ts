import StandardError from 'src/common/standard-error';
import { ErrorCodes } from 'src/common/error-type';
import { AdminUser } from 'src/domain/admin-user.entity';
import { getOneById } from 'src/repository/admin-user.repository';
import { paginationRolePermissionService } from './role-permission.service';
import { signAccessToken } from 'src/middleware/auth.token';




async function loginAdminService(admin: AdminUser) {
    const { EMAIL, PASSWORD } = admin;
    const query = {
        where: { EMAIL },
        relations: ['ROLE_ID']
    }
    const getUser = await getOneById(query);

    if (getUser?.PASSWORD !== PASSWORD) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Password must be match."
        );
    }

    const tokenBody = {
        EMAIL,
        ADMIN_ID: getUser?.ID,
        ROLE_ID: getUser?.ROLE_ID?.ID,
        ROLE_NAME: getUser?.ROLE_ID?.NAME
    }

    const authToken = await signAccessToken(tokenBody);

    const permissionList = await paginationRolePermissionService({ ROLE_ID: getUser?.ROLE_ID?.ID })

    return {
        authToken, email: EMAIL, permissionList: getUser?.ROLE_ID?.NAME === "SUPER_ADMIN" ?
            permissionList?.map((data) => ({
                NAME: data.NAME,
                SLUG: data.SLUG
            })) : permissionList?.filter((isChecked) =>
                isChecked.IS_CHECKED
            ).map((data) => ({
                NAME: data.NAME,
                SLUG: data.SLUG
            }))
    };
}



export {
    loginAdminService
};
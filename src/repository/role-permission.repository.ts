import { RolesPermission } from "src/domain/role-permission.entity";


async function insertRolesPermission(data: RolesPermission) {
    return await RolesPermission.save(data);
}


async function listRolesPermission(query: any) {
    return await RolesPermission.findAndCount(query);
}

async function getOneRolesPermissionById(query: any) {
    return await RolesPermission.findOne(query)
}

async function updateRolesPermissionAndReturnById(id: string, data: RolesPermission) {
    return await RolesPermission
        .createQueryBuilder()
        .update(RolesPermission)
        .set({ ...data })
        .where("ID = :id", { id })
        .returning('*')
        .execute();
}


async function deleteRolesPermissionAndReturnById(data: RolesPermission) {
    return await RolesPermission
        .createQueryBuilder()
        .delete()
        .where("ROLE_ID = :roleId AND PERMISSION_ID = :permissionId", {
            roleId: data.ROLE_ID,
            permissionId: data.PERMISSION_ID
        })
        .returning('*')
        .execute();
}


async function listRolesPermissionByRoleID(query: any) {
    return await RolesPermission.find(query); // relations: ['BENEFITS']
}



export { 
    listRolesPermission,
    updateRolesPermissionAndReturnById,
    
    insertRolesPermission,
    getOneRolesPermissionById,
    deleteRolesPermissionAndReturnById,
    listRolesPermissionByRoleID
};


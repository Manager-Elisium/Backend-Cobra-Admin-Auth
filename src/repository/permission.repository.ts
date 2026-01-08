import { Permission } from "src/domain/permission.entity";

async function insertPermission(data: Permission) {
    return await Permission.save(data);
}
async function countPermission(query: any) {
    return await Permission.count(query);
}


async function listPermissionPagination(query: any) {
    return await Permission.findAndCount(query);
}

async function getOnePermissionById(query: any) {
    return await Permission.findOne(query)
}

async function updatePermissionAndReturnById(id: string, data: Permission) {
    return await Permission
        .createQueryBuilder()
        .update(Permission)
        .set({ ...data })
        .where("ID = :id", { id })
        .returning('*')
        .execute();
}


async function listPermission(query: any) {
    return await Permission.find(query);
}


export { insertPermission, countPermission, listPermissionPagination, getOnePermissionById, updatePermissionAndReturnById, listPermission };

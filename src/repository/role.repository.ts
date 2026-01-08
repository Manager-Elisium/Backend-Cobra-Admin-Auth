import { Role } from "src/domain/role.entity";


async function insertOneRole(data: Role) {
    return await Role.save(data);
}

async function countRole(query: any) {
    return await Role.count(query);
}

async function findAllRole(query: any) {
    return await Role.findAndCount(query); 
}

async function allRole(query: any) {
    return await Role.find(query); 
}

async function getOneRoleById(query: any) {
    return await Role.findOne(query)
}

async function updateRoleAndReturnById(id: string, data: Role) {
    return await Role
        .createQueryBuilder()
        .update(Role)
        .set({ ...data })
        .where("ID = :id", { id })
        .returning('*')
        .execute();
}


export { insertOneRole, findAllRole, allRole, countRole, getOneRoleById, updateRoleAndReturnById };
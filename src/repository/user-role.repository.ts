import { UsersRoles } from "src/domain/user-role.entity";


async function insertUsersRoles(data: UsersRoles) {
    return await UsersRoles.save(data);
}


async function listUsersRoles(query: any) {
    return await UsersRoles.findAndCount(query); // relations: ['BENEFITS']
}

async function getOneUsersRolesById(query: any) {
    return await UsersRoles.findOne(query)
}

async function updateUsersRolesAndReturnById(id: string, data: UsersRoles) {
    return await UsersRoles
        .createQueryBuilder()
        .update(UsersRoles)
        .set({ ...data })
        .where("ID = :id", { id })
        .returning('*')
        .execute();
}



export { 
    insertUsersRoles, 
    listUsersRoles, 
    getOneUsersRolesById, 
    updateUsersRolesAndReturnById
};
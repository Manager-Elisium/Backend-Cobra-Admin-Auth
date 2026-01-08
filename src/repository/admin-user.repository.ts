import { AdminUser } from "src/domain/admin-user.entity";


async function insertOne(data: AdminUser) {
    return await AdminUser.save(data);
}


async function countAdmin(query: any) {
    return await AdminUser.count(query);
}

async function findAll(query: any) {
    return await AdminUser.findAndCount(query); 
}

async function getOneById(query: any) {
    return await AdminUser.findOne(query)
}

async function updateAndReturnById(id: string, data: AdminUser) {
    return await AdminUser
        .createQueryBuilder()
        .update(AdminUser)
        .set({ ...data })
        .where("ID = :id", { id })
        .returning('*')
        .execute();
}


async function deleteAndReturnById(id: string) {
    return await AdminUser
        .createQueryBuilder()
        .delete()
        .where("ID = :id", { id })
        .returning('*')
        .execute();
}


export { insertOne, countAdmin, findAll, getOneById, updateAndReturnById, deleteAndReturnById };

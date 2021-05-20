const db = require('../db/db')


async function add(obj,table) {
    const data = await db(table).returning('*').insert(obj)
    return data
}
async function query(tableName,condition,option) {
    const data = await db(tableName).where(condition, option)
    return data
}
async function select(tableName) {
    const data = await db.select().table(tableName)
    return data
}
async function update(tableName,userId,obj) {
    const data = await db(tableName)
    .where({ id: userId })
    .update(obj)
    .returning('*')
    return data
}





module.exports = {
    add,
    query,
    select,
    update
}
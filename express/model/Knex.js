const db = require('../db/db')


async function add(obj,table) {
    const data = await db(table).returning('*').insert(obj)
    return data
}
async function query(tableName,option) {

    const data = await db(tableName).where('email', option)
    return data
}
module.exports = {
    add,
    query
}
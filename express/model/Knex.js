const db = require('../db/db')


async function add(obj,table) {
    const data = await db(table).returning('*').insert(obj)
    return data
}
async function query(tableName,option) {
    const data = await db.select(option).from(tableName)
    return data
}
module.exports = {
    add,
    query
}
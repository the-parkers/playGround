const db = require('../db/db')


async function add(obj) {
    const data = await db('parks').returning('*').insert(obj)
    return data
}
module.exports = {
    add
}
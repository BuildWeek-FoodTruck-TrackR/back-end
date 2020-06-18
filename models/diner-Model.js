const db = require('../database/dbConfig');

const add = diner => {
    return db('diners')
    .insert(diner)
    .then(([id]) => db('diners').where({ id }).first());
}

const findBy = filter => {
    return db('diners')
    .select('id', 'username', 'password')
    .where(filter)
}

const findById = (id) => {
    return db('diners')
    .select('id', 'username', 'password', 'location')
    .where({ id })
    .first()
}

const update = (changes, id) => {
    return db('diners')
    .where({ id })
    .update(changes)
    
}

const remove = (id) => {
    return db('diners')
    .where({ id })
    .del()
}

module.exports = {
    add,
    findBy,
    findById,
    update,
    remove
}
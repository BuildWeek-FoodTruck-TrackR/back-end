const db = require('../database/dbConfig');


const findBy = () => {
    return db('diners')
}

const add = diner => {
    return db('diners')
    .insert(diner)
    .then(([id]) => db('diners').where({ id }).first());
}

const findById = (id) => {
    return db('diners')
    .select('id', 'username', 'password', 'location', 'favorite_trucks')
    .where({ id })
    .first()
}

const update = (changes, id) => {
    return db('diners')
    .where({ id })
    .update(changes, 'id')
    .then(() => {
        return findById(id)
    })
    
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
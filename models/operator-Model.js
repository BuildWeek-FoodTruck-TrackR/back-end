const db = require('../database/dbConfig');


const findBy = () => {
    return db('operators')
    
}

const add = (operator) => {
    return db('operators')
    .insert(operator)
    .then(([id]) => db('operators').where({ id }).first());
}

const findById = (id) => {
    return db('operators')
    .select('id', 'username', 'password', 'trucks_owned')
    .where({ id })
    .first()
}

const update = (changes, id) => {
    return db('operators')
    .where({ id })
    .update(changes, 'id')
    .then(() => {
        return findById(id)
    })
    
}

const remove = (id) => {
    return db('operators')
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
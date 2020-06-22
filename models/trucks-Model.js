const db = require('../database/dbConfig');

const add = (operator) => {
    return db('trucks')
    .insert(trucks)
    .then(([id]) => db('trucks').where({ id }).first());
}

const findAll = () => {
    return db('trucks')
    .select('*')
}

const findBy = (filter) => {
    return db('trucks')
    .select('id', 'name' )
    .where(filter)
}

const findById = (id) => {
    return db('trucks')
    .select('id', 'name', 'operator_id', 'cuisine_type', 'current_location')
    .where({ id })
    .first()
}



const update = (changes, id) => {
    return db('trucks')
    .where({ id })
    .update(changes)
    .then(() => {
        return findById(id);
    })
    
}

const remove = (id) => {
    return db('trucks')
    .where({ id })
    .del()
}

const findByCuisineType = (type) => {
    return db('trucks')
    .select('*')
    .where('cuisine_type', type)
}


module.exports = {
    add,
    findAll,
    findBy,
    findById,
    update,
    remove,
    findByCuisineType
}
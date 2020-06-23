const db = require('../database/dbConfig');

const add = (trucks) => {
    return db('trucks')
    .insert(trucks)
    .then(([id]) => db('trucks').where({ id }).first());
}

const findAll = () => {
    return db('trucks')
    .select('*')
}


const findById = (id) => {
    return db('trucks')
    .select('id', 'name', 'operator_id', 'cuisine_type')
    .where({ id })
    .then(truck => {
        return db
        .select('*')
        .from('current_location')
        .where({ id })
        .then(location => {
            return {
                truck: truck,
                location: location.map(location => ({...location}))
            }
        })
    })
}

const findBy = (id) => {
    return db('trucks')
    .select('*')
    .from('trucks')
    .where({ id })
    .then(truck => {
        return db
        .select('*')
        .from('current_location')
        .where({ id })
        .then(location => {
            return {
                truck: truck,
                location: location.map(location => ({...location}))
            }
        })
    })
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
    findById,
    findBy,
    update,
    remove,
    findByCuisineType
}
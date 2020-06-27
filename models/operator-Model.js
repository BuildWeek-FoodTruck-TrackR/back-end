const db = require('../database/dbConfig');


const findAll = () => {
    return db('operators')
    .select('*')

}

const findBy = (filter) => {
    return db('operators')
    .select('id', 'username', 'password')
    .where(filter)
}

const add = (operator) => {
    return db('operators')
    .insert(operator, 'id')
    .then((ids) => {
        return findById(ids[0])
    }) 
}

const findById = (id) => {
    return db('operators as o')
    .where({ id })
    .first()
    .then(operator => {
        return db
        .select('*')
        .from('trucks')
        .where({ operator_id: id })
        .then(truckOwned => {
            return {
                operator: operator,
                truckOwned: truckOwned.map(truck => ({...truck}))
            }
        })
    })
    
}

const findTruckByOperator = (operatorId) => {
    return db('trucks as t')
    .select('t.id', 't.name', 't.image URL', 't.cuisine_type', 't.open_time')
    .innerJoin('operators as o', 'o.id', 't.operator_id')
    .where({ 'o.id': operatorId})
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
    findAll,
    add,
    findBy,
    findById,
    findTruckByOperator,
    update,
    remove
}
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
    .select('*')
    .where({ id })
    .then(truck => {
        return db
        .select('*')
        .from('current_location')
        .where({ truck_id: id })
        .then(location => {
            return {
                truck: truck,
                location: location.map(location => ({...location}))
            }
        })
    })  
}

const findByOperator = (id) => {
    return db('trucks')
    .select('*')
    .where({ operator_id: id })
}



const findBy = (id) => {
    return db('trucks')
    .select('*')
    .where({ id })
    
}

const addTruckReview = (review) => {
    return db ('truck_reviews')
    .insert(review, 'id')
    .then(ids => {
        const [id] = ids;
        return findReviewById(id)
    })
}

const findReviewById = (id) => {
    return db 
    .select('*')
    .from('truck_reviews')
    .where({ id })
    .limit(10)
    
}

const getReviewsByTruck = (id) => {
    return db('trucks')
    .select('*')
    .from('trucks')
    .where({ id })
    .then(() => {
        return db('truck_reviews')
        .select('*')
        .where({ truck_id: id })
        .then(review => {
            return {
                review: review.map(review => ({ ...review }))
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



module.exports = {
    add,
    findAll,
    findById,
    findBy,
    update,
    remove,
    findByOperator,
    getReviewsByTruck,
    findReviewById,
    addTruckReview
    
}
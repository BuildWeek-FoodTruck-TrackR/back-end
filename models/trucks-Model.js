const db = require('../database/dbConfig');

const add = (trucks) => {
    return db('trucks')
    .insert(trucks, 'id')
    .then(([id]) => db('trucks').where({ id }).first());
}

const findAll = () => {
    return db('trucks')
    .select('*')
}




const findByLocation = (truckId) => {
    return db('current_location as cl')
    .select('cl.id', 'cl.lon', 'cl.lat', 'cl.departure_time')
    .innerJoin('trucks as t', 't.id', 'cl.truck_id')
    .where({ 't.id': truckId})
}

const findByOperator = (id) => {
    return db('trucks')
    .select('*')
    .where({ operator_id: id })
}



const findBy = (id) => {
    return db('trucks as t')
    .select('t.id', 't.name as name', 't.cuisine_type', 't.image URL', 't.customer_ratings_avg', 't.open_time')
    .where({ id })
    
    
}

const addTruckReview = (review) => {
    return db('truck_reviews')
        .insert(review, 'id')
        .then(ids => {
            const [id] = ids;
            return findReviewById(id);
        })
}

const findReviewById = (truckId) => {
    return db('truck_reviews as tr')
    .select('tr.id', 'tr.rate', 'tr.review')
    .innerJoin('trucks as t', 't.id', 'tr.truck_id')
    .where({ 't.id': truckId })
    
    
}

const findRating = (truckId) => {
    return db('customer_rating as cr')
    .select('cr.id', 'cr.rate')
    .innerJoin('trucks as t', 't.id', 'cr.truck_id')
    .where({ 't.id': truckId })
}

const getReviewsByTruck = (truckId) => {
    return db('truck_reviews as tr')
    .select('d.username', 'tr.rate', 'tr.review')
    .innerJoin('diners as d', 'd.id', 'tr.diner_id')
    .where('tr.truck_id', truckId)
    
    
}


const update = (changes, id) => {
    return db('trucks')
    .where({ id })
    .update(changes, 'id')
    .then(() => {
        return findBy(id);
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
    findBy,
    update,
    remove,
    findByOperator,
    getReviewsByTruck,
    findRating,
    findByLocation,
    findReviewById,
    addTruckReview
    
}
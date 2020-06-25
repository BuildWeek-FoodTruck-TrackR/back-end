const db = require('../database/dbConfig');

function addMenuItem(item) {
    return db('menu_items')
        .insert(item, 'id')
        .then(ids => {
            const [id] = ids;
            return findMenuItemById(id);
        })
}

const findAll = () => {
    return db('menu_items')
    .select('*')
}

const findMenuItemById = (filter) => {
    return db('menu_items')
    .select('id', 'name', 'description', 'price', 'image_URL')
    .where(filter)
}

const findBy = (id) => {
    return db('menu_items')
    .where({ id })
    .first()
    
}

const findMenuByTruck = (truckId) => {
    return db('menu_items as m')
    .select('m.id', 'm.name as name', 'm.description as description')
    .innerJoin('trucks as t', 't.id', 'm.truck_id' )
    .where({ 't.id': truckId })
}



const updateMenuItem = (changes, id) => {
    return db('menu_items')
    .where({ id })
    .update(changes)
    .then(() => {
        return findById(id);
    })
    
}

const removeMenuItem = (id) => {
    return db('menu_items')
    .where({ id })
    .del()
}

module.exports = {
    addMenuItem,
    findAll,
    findBy,
    findMenuItemById,
    findMenuByTruck,
    updateMenuItem,
    removeMenuItem
}
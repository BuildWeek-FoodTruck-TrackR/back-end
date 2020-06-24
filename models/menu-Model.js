const db = require('../database/dbConfig');

const add = (operator) => {
    return db('menus')
    .insert(menus)
    .then(([id]) => db('menus').where({ id }).first());
}

const findAll = () => {
    return db('menus')
    .select('*')
}

const findMenuItemById = (filter) => {
    return db('menus')
    .select('id', 'item_name', 'item_description', 'item_price', 'item_image_URL')
    .where(filter)
}

const findBy = (id) => {
    return db('menus')
    .select('id')
    .where({ id })
    .then(items => {
        return db
        .select('*')
        .from('menu_items')
        .where({ menu_id: id })
        .then(menu => {
            return {
                items: items,
                menu: menu.map(menu => ({...menu}))
            }
        });
    })
    
}

const findMenuByTruck = (id) => {
    return db('menu_items as mi')
    .select('mi.id', 'mi.item_name', 'mi.item_description', 'mi.item_price', 'mi.item_image_URL')
    .where({ id })
}



const updateMenuItem = (changes, id) => {
    return db('menus')
    .where({ id })
    .update(changes)
    .then(() => {
        return findById(id);
    })
    
}

const removeMenuItem = (id) => {
    return db('menus')
    .where({ id })
    .del()
}

module.exports = {
    add,
    findAll,
    findBy,
    findMenuItemById,
    findMenuByTruck,
    updateMenuItem,
    removeMenuItem
}
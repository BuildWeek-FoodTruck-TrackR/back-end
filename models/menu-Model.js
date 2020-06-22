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

const findBy = (filter) => {
    return db('menus')
    .select('id', 'name')
    .where(filter)
}

const findById = (id) => {
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



const update = (changes, id) => {
    return db('menus')
    .where({ id })
    .update(changes)
    .then(() => {
        return findById(id);
    })
    
}

const remove = (id) => {
    return db('menus')
    .where({ id })
    .del()
}

module.exports = {
    add,
    findAll,
    findBy,
    findById,
    update,
    remove
}
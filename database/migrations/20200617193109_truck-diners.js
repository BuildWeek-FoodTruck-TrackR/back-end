
exports.up = async function(knex) {

  // #### OPERATORS TABLE ####
  await knex.schema.createTable("operators", (table) => {
    table.increments("id");
    table.string("username").notNullable().unique();
    table.string("password").notNullable();

  });

  // #### DINERS TABLE ####
  await knex.schema.createTable("diners", (table) => {
    table.increments("id");
    table.string("username").notNullable().unique();
    table.string("password").notNullable();
    table.string("lon");
    table.string('lat');

  });

  // #### TRUCKS TABLE ####
  await knex.schema.createTable("trucks", (table) => {
    table.increments("id");
    table
      .integer("operator_id")
      .references("id")
      .inTable("operators")
      .onDelete("SET NULL");
    table.string("name").notNullable();
    table.string("image URL");
    table.string("cuisine_type").notNullable();
    table.integer("customer_ratings_avg");
    table.string("open_time").notNullable();
    
    
    
  });

  // #### TRUCK RATINGS FROM DINER ####
  await knex.schema.createTable("customer_rating", (table) => {
    table.increments('id');
    table
      .integer('truck_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('trucks')
      .onDelete('SET NULL')

    table
      .integer('diner_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('diners')
      .onDelete('SET NULL')


      table.integer('rate')
      .notNullable()
  })

  // #### FAVORITE TRUCK for DINER ####
  await knex.schema.createTable('fav_trucks', (table) => {
    table.increments('id')

    table
      .integer('diner_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('diners')
      .onDelete('SET NULL')

    table
      .integer('truck_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('trucks')
      .onDelete('SET NULL')
  })

  // #### TRUCK REVIEWS ####
  await knex.schema.createTable('truck_reviews', (table) => {
    table.increments('id')
    table
      .integer('diner_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('diners')
      .onDelete('SET NULL')
    table
      .integer('truck_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('trucks')
      .onDelete('SET NULL')
      
    table.integer('rate').notNullable()
    table.string('review', 500).notNullable()

  })
  

  // #### MENU ITEM #### 
  await knex.schema.createTable("menu_items", (table) => {
    table.increments("id");
    table
      .integer("truck_id")
      .references("id")
      .inTable("trucks")
      .onDelete("SET NULL");
    table.string("name").notNullable();
    table.string("description").notNullable();
    table.float("price").notNullable();
    table.string("image_URL");
    table.float("customer_rating_avg");
  });

  // #### ITEM RATINGS ####
  await knex.schema.createTable('item_ratings', (table) => {
    table.increments('id');
    table
    .integer('item_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('menu_items')
    .onDelete('SET NULL')

    table
    .integer('diner_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('diners')
    .onDelete('SET NULL')

    table.integer('rating');

    
  });

  // #### TRUCK CURRENT LOCATION #### 
  await knex.schema.createTable("current_location", (table) => {
    table.increments("id");
    table
      .integer("truck_id")
      .references("id")
      .inTable("trucks")
      .onDelete("SET NULL");

    table.string('lon').notNullable();
    table.string('lat').notNullable();
    table.string("departure_time");
  });

  
};



exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("current_location");
  await knex.schema.dropTableIfExists("item_ratings");
  await knex.schema.dropTableIfExists("menu_items");
  await knex.schema.dropTableIfExists("menus");
  await knex.schema.dropTableIfExists("truck_reviews");
  await knex.schema.dropTableIfExists("fav_trucks");
  await knex.schema.dropTableIfExists("customer_rating");
  await knex.schema.dropTableIfExists("trucks");
  await knex.schema.dropTableIfExists("diners");
  await knex.schema.dropTableIfExists("operators");
};

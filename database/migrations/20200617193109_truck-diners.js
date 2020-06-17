
exports.up = async function(knex) {
  await knex.schema.createTable("operators", (table) => {
      table.increments("id");
      table.string("username").notNullable().unique();
      table.string("password").notNullable();
      table.string("trucks_owned");
    });

  await knex.schema.createTable("diners", (table) => {
      table.increments("id");
      table.string("username").notNullable().unique();
      table.string("password").notNullable();
      table.string("location");
      table.string("favorite_trucks");

    });


};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("diners");
  await knex.schema.dropTableIfExists("operators");
};

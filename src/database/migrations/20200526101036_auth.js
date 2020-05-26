exports.up = function (knex) {
    return knex.schema.createTable("auth", function (table) {
      table.increments();
      table.string("email").notNullable();
      table.string("password").notNullable();
    });
  };
  
  exports.down = function (knex) {
    knex.schema.dropTable("auth");
  };
  
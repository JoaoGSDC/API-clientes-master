exports.up = function (knex) {
  return knex.schema.createTable("groups", function (table) {
    table.increments();
    table.string("name").notNullable();
    table.string("status").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("groups");
};

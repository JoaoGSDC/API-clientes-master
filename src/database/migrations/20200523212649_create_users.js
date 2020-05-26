exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.string("cpf").primary();
    table.string("name").notNullable();
    table.string("type").notNullable();
    table.string("rg").notNullable();
    table.string("date").notNullable();
    table.string("id_group").notNullable();
    table.string("status").notNullable();

    table.foreign("id_group").references("id").inTable("groups");
  });
};

exports.down = function (knex) {
  knex.schema.dropTable("users");
};

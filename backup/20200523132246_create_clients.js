exports.up = function (knex) {
  knex.schema.createTable("clients", function (table) {
    table.string("cpf").primary();
    table.string("name").notNullable();
    table.string("type").notNullable();
    table.string("rg").notNullable();
    table.string("date").notNullable();
    table.string("id_group").notNullable();
    table.string("status").notNullable();

    table.foreing("id_group").references("id").inTable("groups");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("clients");
};

exports.up = function (knex) {
  knex.schema.createTable("phone", function (table) {
    table.number("id").increment().primary();
    table.string("tel").notNullable();
    table.string("cpf_client").notNullable();

    table.foreign("cpf_client").references("cpf").inTable("users");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("phone");
};

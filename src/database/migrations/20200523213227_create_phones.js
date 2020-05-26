exports.up = function (knex) {
  return knex.schema.createTable("phones", function (table) {
    table.increments();
    table.string("tel").notNullable();
    table.string("cpf_client").notNullable();

    table.foreign("cpf_client").references("cpf").inTable("users");
  });
};

exports.down = function (knex) {
  knex.schema.dropTable("phones");
};


exports.up = function(knex) {
    knex.schema.createTable('group', function(table) {
      table.number('id').increment().primary();
      table.string('name').notNullable();
      table.string('status').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('group');
  };
  
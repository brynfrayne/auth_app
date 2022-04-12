exports.up = function(knex) {
    return knex.schema
      .createTable('users', (table) => {
        table.increments('id').primary();
        table.integer('user_id');
        table.string('avatar_url');
        table.string('name').notNullable();
        table.string('phone');
        table.string('bio');
        table.string('email');
        table.string('password');
      })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
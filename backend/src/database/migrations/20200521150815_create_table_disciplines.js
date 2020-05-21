
exports.up = function(knex) {
    return knex.schema.createTable('disciplines', (table) => {
        table.increments();
        table.string('name').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('disciplines');
};

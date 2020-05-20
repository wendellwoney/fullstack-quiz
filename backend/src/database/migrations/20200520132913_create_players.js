
exports.up = function(knex) {
    return knex.schema.createTable('players', (table) => {
        table.increments();
        table.string('name').nullable();
        table.string('phone').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('players');
};

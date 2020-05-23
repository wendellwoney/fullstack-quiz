
exports.up = function(knex) {
    return knex.schema.createTable('questions', (table) => {
        table.increments().primary();
        table.string('title').notNullable();
        table.boolean('active').notNullable();
        table.datetime('date_insert').notNullable();

        table.integer('discipline_id').unsigned();
        table.foreign('discipline_id').references('id').inTable('disciplines');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('questions');
};

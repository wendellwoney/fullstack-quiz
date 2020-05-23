
exports.up = function(knex) {
    return knex.schema.createTable('alternatives', (table) => {
        table.increments().primary();
        table.string('title').notNullable();
        table.boolean('correct').notNullable();

        table.integer('question_id').unsigned();
        table.foreign('question_id').references('id').inTable('questions');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('alternatives');
};

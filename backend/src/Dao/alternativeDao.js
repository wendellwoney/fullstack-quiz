const connection = require('../config/connection');

module.exports = {
    async getAll() {
        const alternatives = await connection.table('alternatives').select('*');
        return alternatives;
    },

    async getById(id) {
        const alternative = await connection.table('alternatives')
        .where('id', id)
        .select('*')
        .first();

        return discipline;
    },

    async insert(request) {
        const { title, correct } = request.body;

        const [id] = await connection.table('alternatives').insert(
            {
                title,
                correct
            }
        );
        return id;
    },

    async update(request, id) {
        const { title, correct } = request.body;
        await connection.table('alternatives').update(
            {
                title,
                correct
            }
        ).where('id', id);

        return id;
    },

    async delete(id) {
        await connection.table('alternatives').where('id', id).delete();
    }
}
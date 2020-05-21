const connection = require('../config/connection');

module.exports = {
    async getAll() {
        const disciplines = await connection.table('disciplines').select('*');
        return disciplines;
    },

    async getById(id) {
        const discipline = await connection.table('disciplines')
        .where('id', id)
        .select('*')
        .first();

        return discipline;
    },

    async insert(request) {
        let { name } = request.body;

        const [id] = await connection.table('disciplines').insert(
            {
                name
            }
        );
        return id;
    },

    async update(request, id) {
        const { name} = request.body;
        await connection.table('disciplines').update(
            {
                name,
            }
        ).where('id', id);

        return id;
    },

    async delete(id) {
        await connection.table('disciplines').where('id', id).delete();
    }
}
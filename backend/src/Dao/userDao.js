const connection = require('../config/connection');
require("dotenv-safe").config();
const crypto = require('crypto');

validPass = function(pass, hashDb) { 
    var hash = crypto.pbkdf2Sync(pass,  
    process.env.SECRET, 1000, 64, `sha512`).toString(`hex`); 
    return hashDb === hash; 
}

createPass = function(pass) {
    return crypto.pbkdf2Sync(pass, process.env.SECRET,  
    1000, 64, `sha512`).toString(`hex`);
}

module.exports = {
    async loginUser(email, pass) {

        const user = await connection.table('users')
        .where('email', email)
        .select('*')
        .first();

        if(validPass(pass, user.pass)) {
            return user;
        }
        
        return null;
    },

    async getAll() {
        const users = await connection.table('users').select({
            id: 'id',
            name: 'name',
            phone: 'phone',
            email: 'email'
          });
        return users;
    },

    async getById(id) {
        const user = await connection.table('users')
        .where('id', id)
        .select({
            id: 'id',
            name: 'name',
            phone: 'phone',
            email: 'email'
          })
        .first();

        return user;
    },

    async getByIdAll(id) {
        const user = await connection.table('users')
        .where('id', id)
        .select('*')
        .first();

        return user;
    },

    async insert(request) {
        let { name, phone, email, pass } = request.body;
        pass = createPass(pass);
        const [id] = await connection.table('users').insert(
            {
                name,
                phone,
                email,
                pass
            }
        );
        return id;
    },

    async update(request, id) {
        const { name, phone, email } = request.body;
        await connection.table('users').update(
            {
                name,
                phone,
                email,
            }
        ).where('id', id);

        return id;
    },

    async changePass(request, id) {
        let { pass } = request.body;
        pass = createPass(pass);

        await connection.table('users').update(
            {
                pass
            }
        ).where('id', id);

        return id;
    },

    async delete(id) {
        await connection.table('users').where('id', id).delete();
    },
};
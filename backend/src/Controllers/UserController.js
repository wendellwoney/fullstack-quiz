const userDao = require('../Dao/userDao');

module.exports = { 

    async get(request, response) {
        response.status(200).json(await userDao.getAll());
    },

    async getById(request,response) {
        const {id} = request.params;
        response.json(await userDao.getById(id));
    },

    async create(request, response) {
        try{
            let id = await userDao.insert(request);
            return response.status(200).json({ id });
        } catch(err) {
            console.log(err);
            return response.status(500).send({ err: "Error create user. Try again!"});
        }
    },

    async update(request, response) {
        const {id} = request.params;
        const user = await userDao.getById(id);
        if(!user) {
            return response.status(404).send({ err : 'User not found!'})
        }
        try{
            await userDao.update(request, id);
            let upUser = await userDao.getById(id);

            return response.status(200).json(upUser);
        } catch(err)
        {
            return response.status(500).send({ err : 'Not update user, try again.'})
        }
    },

    async delete(request, response) {
        const {id} = request.params;
        const user = await userDao.getById(id);
        if(!user) {
            return response.status(404).send({ err: 'User not found!'});
        }
        try{
            await userDao.delete(id);
            return response.status(204).send();
        } catch(err) {
            return response.status(500).send({ err: 'Not delete user, try again.'});
        }
    },

    async changePass(request, response) {
        const {id} = request.params;
        const user = await userDao.getById(id);
        if(!user) {
            return response.status(404).send({ err: 'User not found!'});
        }
        try{
            await userDao.changePass(request, id);
            let upUser = await userDao.getByIdAll(id);

            return response.status(200).json(upUser);
        } catch(err)
        {
            return response.status(500).send({ err : 'Not update pass of the user, try again.'})
        }
    }
}
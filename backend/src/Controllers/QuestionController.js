const questionDao = require('../Dao/questionDao');

module.exports = {
    async get(request, response) {
        return response.status(200).json(await questionDao.getAll());
    },

    async getById(request,response) {
        const {id} = request.params;
        const question = await questionDao.getById(id);
        if(!question) {
            return response.status(404).send({ err : 'Question not found!'});

        }
        return response.status(200).json(question);
    },

    async create(request, response) {
        try{
            let id = await questionDao.insert(request);
            return response.status(200).json({ id });
        } catch(err) {
            console.log(err);
            return response.status(500).send({ err: "Error create question. Try again!"});
        }
    },

    async update(request, response) {
        const {id} = request.params;
        const question = await questionDao.getById(id);
        if(!question) {
            return response.status(404).send({ err : 'Question not found!'})
        }
        try{
            await questionDao.update(request, id);
            let upQuestion = await questionDao.getById(id);
            return response.status(200).json(upQuestion);
        } catch(err) {
            return response.status(500).send({ err : 'Not update question, try again.'})
        }
    },

    async delete(request, response) {
        const {id} = request.params;
        const user = await questionDao.getById(id);
        if(!user) {
            return response.status(404).send({ err: 'User not found!'});
        }
        try{
            await questionDao.delete(id);
            return response.status(204).send();
        } catch(err) {
            return response.status(500).send({ err: 'Not delete user, try again.'});
        }
    },
}
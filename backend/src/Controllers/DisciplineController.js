var jwt = require('jsonwebtoken');
const disciplineDao = require('../Dao/disciplineDao');
require("dotenv-safe").config();

module.exports = {
    async get(request, response) {
        response.status(200).json(await disciplineDao.getAll());
    },

    async getByid(request, response) {
        const {id} = request.params;
        const discipline = await disciplineDao.getById(id);
        if(!discipline) {
            return response.status(404).send({ err : 'Discipline not found!'});
        }

        response.status(200).json(discipline);
    },

    async create(request, response) {
        try{
            let id = await disciplineDao.insert(request);
            return response.status(200).json({ id });
        } catch(err) {
            console.log(err);
            return response.status(500).send({ err: "Error create discipline. Try again!"});
        }
    },

    async update(request, response) {
        const {id} = request.params;
        const discipline = await disciplineDao.getById(id);
        if(!discipline) {
            return response.status(404).send({ err : 'Discipline not found!'});
        }
        try{
            await disciplineDao.update(request, id);
            let upDiscipline = await disciplineDao.getById(id);

            return response.status(201).json(upDiscipline);
        } catch(err)
        {
            return response.status(500).send({ err : 'Not update discipline, try again.'})
        }
    },

    async delete(request, response) {
        const {id} = request.params;
        const discipline = await disciplineDao.getById(id);
        if(!discipline) {
            return response.status(404).send({ err: 'Discipline not found!'});
        }
        try{
            await disciplineDao.delete(id);
            return response.status(204).send();
        } catch(err) {
            return response.status(500).send({ err: 'Not delete discipline, try again.'});
        }
    }
}
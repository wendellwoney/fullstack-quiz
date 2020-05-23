const connection = require('../config/connection');

module.exports = {
    async getAll() {
        const questions = await connection.table('questions').select('*')
        .join('alternatives', function(){
            this.on('questions.id', '=', 'alternatives.question_id')
        })
        .join('disciplines', function(){
            this.on('disciplines.id', '=', 'questions.discipline_id')
        });
        return questions;
    },

    async getById(id) {
        const question = await connection.table('questions')
        .join('alternatives', function(){
            this.on('questions.id', '=', 'alternatives.question_id')
        })
        .join('disciplines', function(){
            this.on('disciplines.id', '=', 'questions.discipline_id')
        })
        .where('questions.id', id)
        .select('*')
        .first();

        return discipline;
    },

    async insert(request) {
        try{
            const { title, discipline_id, active, date_insert } = request.body;
            const { alternatives } = request.body;
            const [id] = await connection.table('questions').insert(
                {
                    discipline_id,
                    title,
                    active,
                    date_insert
                }
            );
    
            //Insert Alternatives
            alternatives.map( alternative => (
                await connection.table('alternatives').insert({
                    title: alternative.title,
                    correct: alternative.correct
                })
            ));
    
            return id;
        } catch(err) {
            throw new Error('Erro insert a new question. Try again!');
        }
    },

    async update(request, id) {
        const { title, discipline_id, active, date_insert } = request.body;
        const { alternatives } = request.body;
        await connection.table('questions').update(
            {
                discipline_id,
                title,
                active,
                date_insert
            }
        ).where('id', id);

        alternatives.map( function(alternative) {
            if(alternative.id == null) {
                await connection.table('alternatives').insert({
                    title: alternative.title,
                    correct: alternative.correct
                })
            } else {
                await connection.table('alternatives').update({
                    title: alternative.title,
                    correct: alternative.correct
                }).where('id', alternative.id)
            }
        });

        return id;
    },

    async delete(id) {
        await connection.table('questions').where('id', id).delete();
    }
}
const connection = require('../config/connection');

module.exports = {
    async getAll() {
        
        const questions = await connection.table('questions').select('*');
        const promises = questions.map(async question => {
            const discipline = await connection.table('disciplines')
            .select('*')
            .where('id', '=', question.discipline_id).first();
            const alternatives = await connection.table('alternatives')
            .select('*')
            .where('question_id', '=', question.id);
            let questionAdd = {
                id: question.id,
                active: question.active,
                title: question.title,
                date_insert: question.date_insert,
                discipline: discipline,
                alternatives: alternatives
            };
            return questionAdd;
        });
        
        return await Promise.all(promises);
    },

    async getById(id) {
        const question = await connection.table('questions')
        .where('questions.id', id)
        .select('*')
        .first();
        if(!question) {
            return null;
        }
        const discipline = await connection.table('disciplines')
            .select('*')
            .where('id', '=', question.discipline_id).first();

        const alternatives = await connection.table('alternatives')
            .select('*')
            .where('question_id', '=', question.id);

        let questionAdd = {
            id: question.id,
            title: question.title,
            active: question.active,
            date_insert: question.date_insert,
            discipline: discipline,
            alternatives: alternatives
        };

        return questionAdd;
    },

    async insert(request) {
        try{
            const { title, discipline_id, active, date_insert } = request.body;
            const { alternatives } = request.body;
            console.log(alternatives);
            const today = Date.now();
            const [id] = await connection.table('questions').insert(
                {
                    discipline_id,
                    title,
                    active: true,
                    date_insert: this.dataAtualFormatada()
                }
            );
    
            //Insert Alternatives
            alternatives.map( async function(alternative) {
                await connection.table('alternatives').insert({
                    title: alternative.title,
                    correct: alternative.correct,
                    question_id: id
                })
            });
    
            return id;
        } catch(err) {
            console.log(err);
            throw new Error('Erro insert a new question. Try again!');
        }
    },

    async update(request, id) {
        const { title, active } = request.body;
        const { alternatives } = request.body;
        await connection.table('questions').update(
            {
                title,
                active
            }
        ).where('id', id);

        alternatives.map( async function(alternative) {
            if(!alternative.id) {
                await connection.table('alternatives').insert({
                    title: alternative.title,
                    correct: alternative.correct,
                    question_id: id
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
    },

    dataAtualFormatada(){
        var data = new Date(),
            dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
        return anoF+"-"+mesF+"-"+diaF;
    }
}
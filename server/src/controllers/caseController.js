const { default: knex } = require('knex');
const connection = require('../database/connection');

module.exports = {
  async create(req, res, next) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    if(!title || !description || !value) return res.status(400).json({ msg: 'Preencha todos os campos' });
    
    const ongAlready = await connection('ongs').where('id', ong_id).first();

    if(!ongAlready) return res.status(401).json({ msg: 'Você não tem permissão!' });

    const [id] = await connection('cases').insert({ title, description, value, ong_id });

    return res.status(201).json({ msg: 'Caso cadastrado com sucesso' });
  },

  async index(req, res, next) {
    const {page = 1} = req.query;
    const ong_id = req.headers.authorization;

    const [count] = await connection('cases').where('ong_id', ong_id).count()
   
    const cases = await connection('cases')
      .join('ongs', 'ongs.id', '=', 'cases.ong_id')
      .offset((page - 1) * 5)
      .where('ong_id', ong_id)
      .select(['cases.*', 
        'ongs.name', 
        'ongs.email', 
        'ongs.whatsapp', 
        'ongs.city', 
        'ongs.uf'
      ]);

    res.header('X-Total-Count', count['count(*)']);
    return res.json(cases);
  },

  async delete(req, res, next) {
    const {id} = req.params;
    const reqOng_id = req.headers.authorization;

    const cases = await connection('cases').select().where('id', id).first();

    if(cases.ong_id !== reqOng_id) return res.status(401).json({ Error: 'Você não tem permissão'});

    await connection('cases').where('id', id).delete();

    return res.status(204).send();
  }
}
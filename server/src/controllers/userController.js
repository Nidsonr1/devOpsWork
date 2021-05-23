const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
  async create(req, res, next) {
    const { name, email, password } = req.body;

    if(!name || !email || !password) return res.status(400).json({ msg: 'Preencha todos os campos' });

    const userAlready = await connection('clients').where('email', email).first();

    if(userAlready) return res.status(400).json({ msg: 'Usuário já cadastrado' });

    const id = crypto.randomBytes(4).toString('HEX');

    const {newClient} = await connection('clients').insert({ id, name, email, password });

    return res.status(201).json({
      msg: 'Usuário cadastrado com sucesso',
    });
  },

  async login(req, res, next) {
    const { email, password } = req.body;

    const userAlready = await connection('clients').select().where('email', email).first();

    if(!userAlready) return res.status(404).json({msg: 'Usuário não cadastrado'});
    
    return res.status(202).json({ msg: `Bem-vindo(a) ${userAlready.name}` });
  }
}
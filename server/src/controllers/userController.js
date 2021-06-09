const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
  async create(req, res, next) {
    const { name, email, password } = req.body;

    if(!name || !email || !password) return res.status(400).json({ error: 'Preencha todos os campos' });

    const userAlready = await connection('clients').where('email', email).first();

    if(userAlready) return res.status(400).json({ error: 'Usuário já cadastrado' });

    const id = crypto.randomBytes(4).toString('HEX');

    const {newClient} = await connection('clients').insert({ id, name, email, password });
    
    const [user] = await connection('clients').select('name').where('email', email);
    return res.status(201).json({
      msg: `Usuário cadastrado com sucesso! Seja Bem Vindo(a) ${user.name}`,
    });
  },

  async login(req, res, next) {
    const { email, password } = req.body;

    if(!email || !password) return res.status(400).json({ error: 'Preencha todos os campos' });
    
    const userAlready = await connection('clients').select()
      .where('email', email)
      .andWhere('password', password)
      .first();

    if(!userAlready) return res.status(404).json({error: 'Não há um héroi com estas credenciais'});
    
    const name = userAlready.name;
    return res.status(202).json({
      name,
      msg: `Bem-vindo(a) ${name}`
    });
  },
}
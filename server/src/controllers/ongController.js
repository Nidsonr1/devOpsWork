const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
  async create(req, res, next) {
    const {name, email, whatsapp, city, uf} = req.body;

    console.log(name, email, whatsapp, city, uf)
    
    if(!name || !email || !whatsapp || !city || !uf) return res.status(400).json({ msg: 'Preencha todos os campos' });

    const ongAlready = await connection('ongs').where('name', name).first();

    if(ongAlready) return res.status(400).json({ Error: 'Ong já cadastrada' });

    const id = crypto.randomBytes(4).toString('HEX');
  
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });
  
    return res.status(201).json({id});
  },

  async login(req, res, next) {
    const {id} = req.body;

    if(!id) return res.status(400).json({ msg: 'Preencha todos os campos' });

    const ong = await connection('ongs').select().where('id', id).first();

    if(!ong) return res.status(404).json({Error: 'Ong não cadastrado'});
    
    return res.status(202).json({ msg: `Bem-vindo(a) ${ong.name}` });
  },

  async index(req, res, next) {
    const {page = 1} = req.query;
    
    const [count] =  await connection('ongs').count();

    const ongs = await connection('ongs')
      .limit(5)
      .offset((page -1) * 5)
      .select([ 
        'ongs.name', 
        'ongs.email', 
        'ongs.whatsapp', 
        'ongs.city', 
        'ongs.uf'
      ]);

    res.header('X-Total-Count', count['count(*)']);

    return res.json(ongs);
  }
}
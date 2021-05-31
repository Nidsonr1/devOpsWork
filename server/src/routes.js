const express = require('express');
const route = express.Router();

const userController = require('./controllers/userController');
const ongController = require('./controllers/ongController');
const caseController = require('./controllers/caseController');

//Rotas de clientes
route.post('/user/register', userController.create);
route.post('/user/login', userController.login);

//Rotas das Ongs
route.post('/ongs/register', ongController.create);
route.post('/ong/login', ongController.login);
route.get('/ongs', ongController.index);

//Rotas para os Casos da Ong
route.post('/ong/newCase', caseController.create);
route.post('/ong/cases', caseController.index);
route.delete('/case/:id', caseController.delete);

module.exports = route;
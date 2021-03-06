const express = require('express');

const AuthController = require('./controllers/AuthController');
const ClientsController = require('./controllers/ClientsController');
const GroupsController = require('./controllers/GroupsController');

const routes = express.Router();

routes.post('/user', AuthController.create);
routes.post('/auth', AuthController.login);

routes.get('/clients:cpf?', ClientsController.index);
routes.post('/clients', ClientsController.create);
routes.put('/clients', ClientsController.update);
routes.delete('/clients/:cpf', ClientsController.delete);

routes.get('/phones:cpf?', ClientsController.indexPhone);

routes.get('/groups:id?', GroupsController.index);
routes.post('/groups', GroupsController.create);
routes.put('/groups', GroupsController.update);
routes.delete('/groups/:id', GroupsController.delete);

module.exports = routes;
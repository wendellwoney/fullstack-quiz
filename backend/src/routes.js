const express = require('express');
const routes = express.Router();

const loginController = require('./Controllers/LoginController');
const userController = require('./Controllers/UserController');

//USER
routes.post('/user/login', loginController.login);
routes.get('/user', loginController.verifyJWT, userController.get);
routes.get('/user/:id', loginController.verifyJWT, userController.getById);
routes.post('/user', loginController.verifyJWT, userController.create);
routes.put('/user/:id', loginController.verifyJWT, userController.update);
routes.delete('/user/:id', loginController.verifyJWT, userController.delete);
routes.put('/user/:id/pass', loginController.verifyJWT, userController.changePass);
//END USER

//DISCIPLINE
routes.get('/discipline', loginController.verifyJWT, userController.get);
//END DISCIPLINE


module.exports = routes;
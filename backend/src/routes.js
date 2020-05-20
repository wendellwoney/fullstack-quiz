const express = require('express');
const routes = express.Router();

const loginController = require('./Controllers/LoginController');
const userController = require('./Controllers/UserController');

routes.post('/user/login', loginController.login);

//User
routes.get('/user', loginController.verifyJWT, userController.get);
routes.post('/user', loginController.verifyJWT, userController.create);
routes.put('/user/:id', loginController.verifyJWT, userController.update);
routes.delete('/user/:id', loginController.verifyJWT, userController.delete);
routes.put('/user/:id/pass', loginController.verifyJWT, userController.changePass);
module.exports = routes;
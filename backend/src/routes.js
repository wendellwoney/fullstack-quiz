const express = require('express');
const routes = express.Router();

const loginController = require('./Controllers/LoginController');
const userController = require('./Controllers/UserController');
const disciplineController = require('./Controllers/DisciplineController');
const questionController = require('./Controllers/QuestionController');

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
routes.get('/discipline', loginController.verifyJWT, disciplineController.get);
routes.get('/discipline/:id', loginController.verifyJWT, disciplineController.getById);
routes.post('/discipline', loginController.verifyJWT, disciplineController.create);
routes.put('/discipline/:id', loginController.verifyJWT, disciplineController.update);
routes.delete('/discipline/:id', loginController.verifyJWT, disciplineController.delete);
//END DISCIPLINE

//QUESTION
routes.get('/question', loginController.verifyJWT, questionController.get);
routes.get('/question/:id', loginController.verifyJWT, questionController.getById);
routes.post('/question', loginController.verifyJWT, questionController.create);
//END QUESTION

module.exports = routes;
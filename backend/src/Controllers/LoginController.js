var jwt = require('jsonwebtoken');
const userDao = require('../Dao/userDao');
require("dotenv-safe").config();

module.exports = {
    async login(request, response) {
        const {email, pass} = request.body;

        if(!email || !pass) {
            return response.status(500).send({ err: "error auth"});
        }

        const user = await userDao.loginUser(email, pass);

        if(!user) {
            return response.status(500).send({ err: "Login or password not exists in database"});
        }

        delete user.pass;

        let token = jwt.sign({ user }, process.env.SECRET, {
            expiresIn: 3600
        });

        response.status(200).json({ auth: true, token: token});
    },

    async logOut(request, response) {
        response.status(200).json({ auth: false, token: null});
    },

    verifyJWT(request, response, next) {
        let token = request.headers.authorization;
        if(!token) {
            response.status(401).json({ auth: false, err: 'No token provided.'});
        }
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                response.status(500).json({ auth: false, err: 'Failed to authorize token.'})
            }

            request.User = decoded.user;
            next();
        });
    },

    refreshToken(request, response) {
        let user = userDao.getById(request.User.id);
        delete user.senha;
        if(!user) {
            response.status(404).json({ err: 'User not found!'})
        }

        let token = jwt.sign({ user }, process.env.SECRET, {
            expiresIn: 3600,
        });
        
        return response.status(201).json({ auth: true, token: token});
    }
}
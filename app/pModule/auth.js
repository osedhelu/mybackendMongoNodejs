let jwt = require('jsonwebtoken');
const {SEED} = require('../../config/config');
const {r} =require('./respServer');
// ?=================================
// Verificar Token
// ?=================================
const auth = (req, res, next) => {
    token = req.headers.token;
    
    jwt.verify(token, SEED, (err,decode)=> {
        if(err){
            r._401(res, {message: 'token no incorrecto', err})
        }
        // r._200(res, decode);
        req.userToken = decode.users
        next();
    });   
}

module.exports = {auth}
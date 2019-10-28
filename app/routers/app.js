var express = require('express');
var app = express();
const {r} = require('../pModule/respServer');
app.get('/', (req, res, next)=> {
   r._200(res, {ok: true, message: '111'})    
})

module.exports = app;
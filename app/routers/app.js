var express = require('express');
var app = express();
let { _200 } = require('../pModule/respServer');
app.get('/', (req, res, next)=> {
    _200(res, {ok: true, message: '111'})    
})

module.exports = app;
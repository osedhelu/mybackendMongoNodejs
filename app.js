// Requires
var express = require('express');
let {color} = require('./pModule/color');
let mongoose = require('mongoose');
// Inicializar Variables
var app = express();
//rutas
app.get('/', (rep, res, next)=> {
    res.status(200).json({
        ok: true,
        message: 'Petision realizada Correctamente'
    });
});
 

mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if(err) throw err;
    console.log(`base de Datos  : ${color.success}`, 'online');
});


app.listen(3000, () => {
    console.log(`Express server puerto 3000: ${color.success}`, 'online');
});
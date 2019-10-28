let express = require('express');
let {r} = require('../pModule/respServer');
let fs = require('fs');

let app = express();

app.get('/:tipo/:img', (req, res) => {
    let tipo = req.params.tipo;
    let img = req.params.img;
    let veridTipo = ['medico', 'user', 'hospital'];
    if(veridTipo.indexOf(tipo) < 0){
        r._400(res, {message: `la colleccion ${tipo} no existe `, error: {message:`solo son permitidas ${veridTipo.join(', ')}`}})
    }
    let path = `./app/uploads/${tipo}/${img}`;

    fs.exists(path ,existe=>{
        if(!existe){
            path = './app/uploads/no-img.jpg';
        }
        res.sendfile(path);
    });

});

module.exports = app
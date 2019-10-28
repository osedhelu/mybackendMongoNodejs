const express = require('express');
let app = express();
let {r} = require('../pModule/respServer');
let {ValidarFileUpload, fnFileUpload} = require('../pModule/logicaUpload');
const fileUpload = require('express-fileupload');
app.use(fileUpload());


app.put('/:tipo/:id', (req, res) => {
    let tipo = req.params.tipo;
    let id = req.params.id;
    ValidarFileUpload(req.files, id, tipo).then(resp =>{
        fnFileUpload(tipo, id, req.files, resp)
        .then(dataResp=>r._200(res, dataResp))
        .catch(err=>r._400(res, err))

    }).catch((err) =>{
        if(err.res === 500){
            r._500(res, {ok: false, message: err.message, Error: err.error})
        }else if(err.res == 401){
            r._401(res, {ok: false, message: err.message, Error: err.error})
        }else if (err.res == 400){
            r._400(res, {ok: false, message: err.message, Error: err.error})
        }
    });
});
module.exports = app;
var express = require('express');
var app = express();
let hospitalSchema = require('../models/schema_hospital');
const {r} = require('../pModule/respServer');
const {auth} = require('../pModule/auth');
//=======================================
// Listar un Hospital
// =======================================
app.get('/', (req, res, next) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    hospitalSchema.find({})
    .skip(desde)
    .limit(5)
    .populate('user', 'name email')
    .exec((err, data)=>{
        if(err) {
            return r._500(res, {Error: 'En el Servidor', err})
        }
        hospitalSchema.count({}, (err, conteo) => {
            r._200(res, {data, total: conteo});
        });
    });
});
//=======================================
// agregar un Hospital
// =======================================

app.post('/', auth, (req, res) => {
    const dataToken = req.userToken;
    let body = req.body

    let hospital = new hospitalSchema({
        name: body.name,
        user: dataToken._id
    });
    hospital.save((err, dataResp) => {
        if(err){
            return r._400(res, {Error: "Error en el Servdor", err})
        }

        r._201(res, {ok: "Usuario Regstrado", dataResp, tokenUsers: req.userToken});
    })
});
//=======================================
// agregar un Hospital
//=======================================

app.put('/:id', auth, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    hospitalSchema.findById(id, (err, resp) => {
        if(err){
            return r._500(res, {message: 'Error al buscar el Hospital', err});
        }
        if (!resp) {
            return r._400(res, {message: `El Hospital de id${id} no Existe`});
        }
        resp.name = body.name;
        resp.user = req.userToken._id;

        resp.save((err, dataUsers) =>{
            if(err){
                return r._400(res, {message: 'Error al actualizar el Hospital', err});
            }
            r._200(res, dataUsers);
        });
    });
});
//=======================================
// agregar un Hospital
//=======================================
app.delete('/:id', auth, (req, res) => {
    let id = req.params.id;
    hospitalSchema.findByIdAndRemove(id, (err, userRemove) =>{
        if(err) {
            return r._500(res, {Error: 'Susedio un error al borrar el Hosptal', err})
        }
        if(!userRemove) {
            return r._400(res, {Error: `No Existe el Hospital`, err})
        }
        r._200(res, userRemove);
    });
});
module.exports = app;
var express = require('express');
var app = express();
let medicoSchema = require('../models/schema_medico');
const {r} = require('../pModule/respServer');
const {auth} = require('../pModule/auth');


//=======================================
// Listar un Hospital
// =======================================
app.get('/', (req, res, next) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    medicoSchema.find({}, 'name hospital img user')
    .skip(desde)
    .limit(5)
    .populate('user', 'name email')
    .populate('hospital', 'name')
    .exec((err, dataResp)=>{
        if(err){
            return r._500(res, {ok:false, message: 'Error en el Servidor'});
        }
        medicoSchema.count({}, (err, conteo) => {
            r._200(res, {dataResp, total: conteo});
        })
    })
});
//=======================================
// agregar un medico
// =======================================
app.post('/', auth, (req, res) => {
    let dataToken = req.userToken;
    let body = req.body;
    let medico = new medicoSchema({
        name: body.name,
        hospital: body.hospital,
        user: dataToken._id,
        img: body.img
    });
    medico.save((err, dataResp) => {
        if(err){
            return r._400(res, {ok: false, message: 'Error en el servidor', err})
        }
        r._200(res, {ok:true, dataResp, tokenUsers: dataToken})
    });
});
//=======================================
// editar un medico
// =======================================
app.put('/:id', auth, (req, res) => {
    var id = req.params.id;
    var body = req.body;
    medicoSchema.findById(id, (err, dataResp) =>{
        if(err) {
            return r._400(res, {message: 'Error al buscar el medico', err})
        }
        if(!dataResp){
            return r._400(res, {message: `El medico no Existe`});
        }
        dataResp.name = body.name;
        dataResp.img = body.img;
        dataResp.hospital = body.hospital;
        dataResp.save((err, respData) => {
            if(err){
                return r._400(res, {message: 'Error al actualizar el medico', err});
            }
            r._200(res, respData);
        });
    });
});
//=======================================
// Elimnar un Medico
// =======================================
app.delete('/:id', auth, (req, res) => {
    let id = req.params.id;
    medicoSchema.findByIdAndRemove(id, (err, userRemove) =>{
        if(err) {
            return r._500(res, {Error: 'Susedio un error al borrar el Medico', err})
        }
        if(!userRemove) {
            return r._400(res, {Error: `No Existe el Medico de ID ${id}`, err})
        }
        r._200(res, userRemove);
    });
})
module.exports = app;
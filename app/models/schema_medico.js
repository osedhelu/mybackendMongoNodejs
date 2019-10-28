const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let medicosSchema = new Schema({
    name: {type: String, unique: true, required:[true, 'El nombre es necesario']},
    img: {type: String, required: false},
    user: {type:Schema.Types.ObjectId, ref: 'user',  required:true},
    hospital: {type:Schema.Types.ObjectId, ref: 'hospital', required:[true, 'El id hospital es un campo requerido']}
}, {collection: 'medicos'})

module.exports = mongoose.model('medico', medicosSchema)
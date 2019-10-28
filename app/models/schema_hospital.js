const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let HospitalSchema = new Schema({
    name: {type: String,unique:true, required:[true, 'El nombre del Hospital es Requerido']},
    img: {type:String,required:false},
    user: {type: Schema.Types.ObjectId, ref:'user'}
}, {collection: 'hospitales'});
HospitalSchema.plugin( validator, {message: '{PATH} debe ser unico'} );

module.exports = mongoose.model('hospital', HospitalSchema)
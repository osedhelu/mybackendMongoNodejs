let mongoose = require('mongoose');
let validator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol Permitido'
}
let UsuarioSchema = new Schema({
    name: {type: String, unique: true, required: [true, 'El nombre es Necesario']},
    email:{type: String, unique:true, required: [true, 'El correo es Necesario']},
    password: {type: String, required: [true, 'La contraseña es necesaria']},
    img: {type: String, required: false},
    role: {type: String, default: 'USER_ROLE', enum: rolesValidos}
})
UsuarioSchema.plugin( validator, {message: '{PATH} debe ser unico'} );
module.exports = mongoose.model('user', UsuarioSchema);
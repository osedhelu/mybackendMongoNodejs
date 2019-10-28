const hospitalSchema =  require('../models/schema_hospital');
const medicoSchema =  require('../models/schema_medico');
const userSchema =  require('../models/Schema_usuario');
const fs = require('fs');
let ValidarFileUpload = (files, id, tipo) => {
    return new Promise((resolve, reject) => {
        if (!files) {
            reject({res: 500, message: 'No selecciono nada', error: {message: 'debe seleccionar una imagen'}})
        }
        let tipoValid = ['medico', 'hospital', 'user']
        if(tipoValid.indexOf(tipo) < 0){
            reject({res: 401, message: 'la collesion no es correcta', error: {message: `las collectiones correctas son ${tipoValid.join(', ')}`}})
            
        }
        let archivo = files.imagen;
        let nameChopped = archivo.name.split('.');
        let extencFile = nameChopped[nameChopped.length -1];
        let extenValid =['png', 'jpg', 'gif', 'jpeg'];
        if(extenValid.indexOf(extencFile) < 0){
            reject({res: 400, message: 'este archivo no es valido', error: {message: `tiene que ser un archivo de for: ${extenValid.join(', ')}`}})            
        }
       
           resolve(extencFile)
    })
}
let fileDelete = (img, tipo) => {
    let path = `./app/uploads/${tipo}/${img}`;
    if(fs.existsSync(path)){
        fs.unlink(path, err=>{
            return
        });
    }
    return
}
let updateFile = (id, schemaDB, tipo, files, extencFile) => {
    return new Promise((resolve, reject) => {
        let nameFile = `${id}-${new Date().getMilliseconds()}.${extencFile}`;
        let path = `./app/uploads/${tipo}/${nameFile}`
        schemaDB.findById(id, (err, dataResp) => {
            // resolve(dataResp === null)
            if(dataResp === null){
                reject({ message: 'no esta en la base de datos', error: {message: `el ${tipo} con ese id no existe`}})
            }else{
                if(err){
                    reject({ message: 'este archivo no es valido', error: {message: `tiene que ser un archivo de for: ${extenValid.join(', ')}`}})
                }
                fileDelete(dataResp.img, tipo);
                files.imagen.mv(path, err=>{
                    if(err){
                        reject({res: 400, message: 'no ser puede Mover el archivo', error: {message: err}})
                    }
                })     
                dataResp.img = nameFile;
                dataResp.save((err,respData) => {
                    resolve(respData)
                })
            }
        })
    });
}
let fnFileUpload = async(tipo, id, files, extencFile) => {
    switch (tipo) {
        case 'medico':
           return await updateFile(id, medicoSchema, tipo, files, extencFile)
            
        break;
        case 'hospital':
                return await updateFile(id, hospitalSchema, tipo, files, extencFile)
        
        break;
        case 'user':
           return await updateFile(id, userSchema, tipo, files, extencFile)
        break;
        
    }
}

module.exports = {
    ValidarFileUpload, fnFileUpload
}
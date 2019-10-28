const hospitalSchema =  require('../models/schema_hospital');
  const medicoSchema =  require('../models/schema_medico');
  const userSchema =  require('../models/Schema_usuario');

  
let hospitalSearch = async(regex) => {
    return new Promise((resolve, reject) => {
        hospitalSchema.find({name:regex}) 
        .populate('user', 'name email')
        .exec((err, dataResp) => {
            if(err){reject("hay un Error", err)};
            hospitalSchema.count({}, (err, conteo) => {
                resolve({hospitales: dataResp, total: conteo})
            });
        }); 
    });
}
let medicoSearch = (regex) => {
    return new Promise((resolve, reject) => {
        medicoSchema.find({name:regex})
        .populate('user', 'name email')
        .populate('hospital', 'name')
        .exec((err, dataResp) => {
            if(err){reject("hay un Error", err)};
            medicoSchema.count({}, (err, conteo) => {
                resolve({medicos:dataResp, total: conteo})
            })
        });
    });
}
let userSearch = (regex) => {
    return new Promise((resolve, reject) =>{
        userSchema.find({}, 'name email role')
            .or([{name: regex}, {email:regex}])
            .exec((err, dataResp)=>{
                if(err){
                    reject("hay un Error", err)
                };
                userSchema.count({}, (err, conteo) =>{
                    resolve({usuarios: dataResp, total: conteo})     
                });
            })
    })
}
let fnSearch = async(regex) => {
    let tableHosptal = await hospitalSearch(regex);
    let tableMedicos = await medicoSearch(regex);
    let tableUser = await userSearch(regex)
    return {tableHosptal, tableMedicos, tableUser}
};

module.exports = {fnSearch, hospitalSearch, userSearch, medicoSearch}
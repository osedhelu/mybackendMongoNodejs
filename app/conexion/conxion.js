let {color} = require('../pModule/color');
let mongoose = require('mongoose');
let {DBHOST, DBTABLE} = require('../../config/config');
 mongoose.connection.openUri(`mongodb://${DBHOST}/${DBTABLE}`, (err, res) => {
    if(err) throw err;
    console.log(`base de Datos  : ${color.success}`, 'online');
});
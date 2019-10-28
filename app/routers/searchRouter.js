  const express = require('express');
  const {r} = require('../pModule/respServer');
  const {fnSearch, hospitalSearch, userSearch, medicoSearch}= require('../pModule/loginSearch')
  let app = express();


  app.get('/todo/:search', (req, res) => {
        let search = req.params.search;
        let regex = new RegExp(search, 'i')
        fnSearch(regex)
            .then(resp =>r._200(res, resp))
            .catch(err =>r._500(res, err))
        
  })
  app.get('/coleccion/:table/:search', (req, res) =>{
      let table = req.params.table;
      let search = req.params.search;
      let regex = new RegExp(search, 'i')
      let promesa;
    switch (table) {
        case 'user':
            promesa = userSearch(regex)
               
            break;
        case 'hospital':
            promesa = hospitalSearch(regex)
               
            break;
        case 'medico':
           promesa = medicoSearch(regex)
                
            break;
                
        default:
            r._500(res, {ok: false, message: 'esa tabla no existe'})
            break;
    }
    promesa.then(resp => r._200(res, {[table]: resp}))
    .catch(err => r._400(res, {ok:false, message: 'error en la petision', err}))
  });

  module.exports = app
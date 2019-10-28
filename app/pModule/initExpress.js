let {PORT} = require('../../config/config');
// Requires
let express = require('express');
let {color} = require('./color');
let bodyParser = require('body-parser'); 
let serverIndex = require("serve-index");
// Inicializar Variables
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
//server Index

//end server Index
// Import Modules
let appRouter = require('../routers/app');
let usersRouter = require('../routers/userRouter');
let loginRouter = require('../routers/login');
let hospitalRouter = require('../routers/hospitalRouter')
let medicoRouter = require('../routers/medicoRouter');
let searchRouter = require('../routers/searchRouter');
let uploarRouter = require('../routers/upload');
let imageRouter = require('../routers/imagenRouter')

app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/hospital', hospitalRouter);
app.use('/medico', medicoRouter);
app.use('/search', searchRouter);
app.use('/upload', uploarRouter);
app.use('/imagen', imageRouter);
app.use('/', appRouter);

app.listen(PORT, () => {
    console.log(`Express server puerto ${PORT}: ${color.success}`, 'online');
});

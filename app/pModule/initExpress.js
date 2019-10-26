// Requires
let express = require('express');
let {color} = require('./color');
let bodyParser = require('body-parser'); 
// Inicializar Variables
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// Import Modules
let appRouter = require('../routers/app');
let usersRouter = require('../routers/userRouter');
let loginRouter = require('../routers/login');


app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/', appRouter);

app.listen(3000, () => {
    console.log(`Express server puerto 3000: ${color.success}`, 'online');
});

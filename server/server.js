const express = require('express');
const app = express();
const mongosse = require('mongoose');
const bodyParser = require('body-parser');
require('../config/config');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Configuracion global de rutas
app.use(require('./user-route/index'));



mongosse.connect(process.env.URLDB,(err,res) => {
    if(err) throw err;
    console.log('Base de Datos corriendo perfectamente');

});

app.listen(process.env.PORT,()=>{
    console.log('APP corriendo en el puerto :',process.env.PORT);
});
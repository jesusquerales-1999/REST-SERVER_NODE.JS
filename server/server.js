const express = require('express');
const app = express();
const mongosse = require('mongoose');
require('../config/config');
app.use(require('./user-route/user-route'));


mongosse.connect(process.env.URLDB,(err,res) => {
    if(err) throw err;
    console.log('Base de Datos corriendo perfectamente');

});

app.listen(process.env.PORT,()=>{
    console.log('APP corriendo en el puerto :',process.env.PORT);
});
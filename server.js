require('./config/config')

const express =require('express');
const app = express();

const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/',(req,res) => {

    res.send('Hola Mundo Coñoemadree');
})



app.listen(process.env.PORT,()=>{
    console.log('APP corriendo en el puerto :',process.env.PORT);
})


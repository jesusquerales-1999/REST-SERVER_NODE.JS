//====================================
// puerto
//====================================

process.env.PORT = process.env.PORT || 3000;

//====================================
// entorno
//====================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//====================================
// Vencimiento de el token
//====================================
//60 Segundos
//60 Minutos
//24 Horas
//30 Dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//====================================
// SEED de autenticacion
//====================================
process.env.SEED = process.env.SEED || 'este_es_el_seep_de_desarrollo';
//====================================
// Base de datos
//====================================

let urlDB;

if (process.env.NODE_ENV === 'dev'){

    urlDB ='mongodb://localhost:27017/expres'
}

 else{  urlDB ='mongodb+srv://jesusQuerales-000:Wfnes6tVV48VUpr0@clusterq.thlpdjo.mongodb.net/?retryWrites=true&w=majority';
};

process.env.URLDB = urlDB; 


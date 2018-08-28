'use strict'
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();

var configMensaje = require('./controllers/configMensaje');

//cargar rutas

var user_routes = require('./routes/user');
var artist_routes = require('./routes/artist');
var album_routes = require('./routes/album');
var video_routes = require('./routes/video');
var perfil = require('./routes/perfil');
var videop = require('./routes/videoperfil');




app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());


// Configurar cabeceras http
//Cabeceras necesarias para que el front end pueda conectarse 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.post('/api/formulario/:correo', (req, res) => {
    var email = req.params.correo;
console.log(email);
    configMensaje(email);
    res.status(200).send();
})

//rutas base


app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', album_routes);
app.use('/api', video_routes);
app.use('/api', perfil);
app.use('/api', videop);




module.exports = app;
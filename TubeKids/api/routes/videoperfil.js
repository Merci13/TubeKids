'use strict'

var express = require('express');
var ArtistController = require('../controllers/videoperfil');
var api = express.Router();

var md_auth = require('../middlewares/authenticated');


//rutas de express
api.get('/videoperfil',md_auth.ensureAuth,ArtistController.getVideoP);

api.post('/videoperfil',md_auth.ensureAuth,ArtistController.saveVideoP);

//exporta las rutas
module.exports = api;
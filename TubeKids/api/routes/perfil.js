'use strict'

var express = require('express');
var ArtistController = require('../controllers/perfil');
var api = express.Router();

var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir : './uploads/artists'});

//rutas de express
api.get('/perfil/:id',md_auth.ensureAuth,ArtistController.getPerfil);

api.post('/perfil',md_auth.ensureAuth,ArtistController.savePerfil);

api.get('/perfil/:page?',md_auth.ensureAuth,ArtistController.getPerfiles);

api.put('/perfil/:id',md_auth.ensureAuth,ArtistController.updatePerfil);

api.delete('/perfil/:id',md_auth.ensureAuth,ArtistController.deletePerfil);



//exporta las rutas
module.exports = api;
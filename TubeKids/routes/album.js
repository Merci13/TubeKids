'use strict'

var express = require('express');
var AlbumController = require('../controllers/album');
var api = express.Router();

var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir : './uploads/album'});

//rutas de express
api.get('/album',md_auth.ensureAuth,AlbumController.getAlbum);//metodo para obtner los albums

api.post('/album',md_auth.ensureAuth,AlbumController.saveAlbum);//metodo para guardar un album






//exporta las rutas
module.exports = api;
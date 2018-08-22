'use strict'

var express = require('express');
var AlbumController = require('../controllers/album');
var api = express.Router();

var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir : './uploads/albums'});

//rutas de express
api.get('/album/:id',md_auth.ensureAuth,AlbumController.getAlbum);//metodo para obtner los albums

api.post('/album',md_auth.ensureAuth,AlbumController.saveAlbum);//metodo para guardar un album

api.get('/albums/:artist?',md_auth.ensureAuth,AlbumController.getAlbums);//metodo obtener todos los albums

api.put('/album/:id',md_auth.ensureAuth,AlbumController.updateAlbum);//metodo actualizar el album 
 
api.delete('/album/:id',md_auth.ensureAuth,AlbumController.deleteAlbum);//metodo borrar el album  

api.post('/upload-image-album/:id',[md_auth.ensureAuth,md_upload],AlbumController.uploadImage);//metodo para subir la imagen al album

api.get('./get-image-album/:imageFile',AlbumController.getImageFile)//metodo para obtener la imagen de un album









//exporta las rutas
module.exports = api;
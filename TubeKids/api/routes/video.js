'use strict'

var express = require('express');
var VideoController = require('../controllers/video');
var api = express.Router();

var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir : './uploads/videos'});

//rutas de express
api.get('/video/:id',md_auth.ensureAuth,VideoController.getVideo);//metodo para obtner los videos

api.post('/video',md_auth.ensureAuth,VideoController.saveVideo);//metodo para guardar los videos

api.get('/videos/:album?',md_auth.ensureAuth,VideoController.getVideos);//metodo para obtener todos los videos

api.put('/video/:id',md_auth.ensureAuth,VideoController.updateVideo);//metodo para actualizar los videos

api.delete('/video/:id',md_auth.ensureAuth,VideoController.deleteVideo);//metodo para eliminar los videos

api.post('/upload-file-video/:id',[md_auth.ensureAuth,md_upload],VideoController.uploadFile);//metodo para subir la archivo al video

api.get('/get-file-video/:videoFile',VideoController.getVideoFile)//metodo para obtener archivo de un video

    
//exporta las rutas
module.exports = api;
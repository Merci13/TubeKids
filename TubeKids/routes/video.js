'use strict'

var express = require('express');
var VideoController = require('../controllers/video');
var api = express.Router();

var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir : './uploads/videos'});

//rutas de express
api.get('/video',md_auth.ensureAuth,VideoController.getVideo);//metodo para obtner los videos



//exporta las rutas
module.exports = api;
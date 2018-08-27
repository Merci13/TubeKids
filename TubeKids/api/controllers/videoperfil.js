'use strict'

var path = require('path');
var fs = require('fs');

var mongoosePaginate = require('mongoose-pagination');
var Artist = require('../models/artist');
var Album = require('../models/artist');
var Video = require('../models/video');
var VideoP = require('../models/videoperfil');

//metodo para guardar un video
function saveVideoP(req, res) {
    var videop = new VideoP();
    var params = req.body;
    videop.userId = params.userId;
    videop.videoId = params.videoId;

    videop.save((err, perfilStored) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el servidor'
            });
        } else {
            if (!perfilStored) {
                res.status(404).send({
                    message: 'No se a guardado el Perfil'
                });
            } else {
                res.status(200).send({
                    videop: perfilStored
                });
            }
        }
    });

}



//Metodo para listar los videos
function getVideoP(req, res) {

    VideoP.find(function (err, videosp) {
        if (err) {
            res.status(422);
            res.json({ error: err });
        }
        res.status(200);
        res.json(videosp);
    });
}

module.exports = {
    saveVideoP,
    getVideoP
}

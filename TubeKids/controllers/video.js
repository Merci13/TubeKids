'use strict'

var path = require('path');
var fs = require('fs');

var mongoosePaginate = require('mongoose-pagination');
var Artist = require('../models/artist');
var Album = require('../models/albums');
var Video = require('../models/video');

//metodo para obtener el video

function getVideo(req,res){
    var videoId= req.params.id;

    Video.findById(videoId).populate({path:'album'}).exec((err,video)=>{
        if (err) {
            res.status(500).send({message:'Error en la peticion'});
        } else {
            if (!video) {
                res.status(404).send({message:'No existe el video'});
            } else {
                res.status(200).send({video:video});
            }
        }
    });


    
}

//metodo para guardar un video
function saveVideo(req,res){
var video = new Video();
var params = req.body;
video.number = params.number;
video.name = params.name;
video.duration = params.duration;
video.file = 'null';
video.album = params.album;

video.save((err,videoStored)=>{
    if (err) {
        res.status(500).send({message: 'Error en el servidor'});
    } else {
        if (!videoStored) {
            res.status(404).send({message: 'No se a guardado el video'});
        } else {
            res.status(200).send({video:videoStored});
        }
    }
});

}


//Metodo para listar los videos
function getVideos(req,res){
    var albumId = req.params.id;

    if (!albumId) {
        var find = Video.find({}).sort('number');
    } else {
        var find = Video.find({album:albumId}).sort('number');
    }
    find.populate({
        path : 'album',
        populate: {
            path: 'artist',
            model:'Artist'
        }
    }).exec(function(err,videos){
        if (err) {
            res.status(500).send({message:'Error en la peticion'});
        } else {
            if (!videos) {
            res.status(404).send({message:'No hay videos!!'});
                
            } else {
            res.status(200).send({videos});
                
            }
        }
    });
}


//metodo para exportar los metodos dentro del archivo
module.exports ={
    getVideo,
    saveVideo,
    getVideos
}
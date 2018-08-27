'use strict'

var path = require('path');
var fs = require('fs');

var mongoosePaginate = require('mongoose-pagination');
var Artist = require('../models/artist');
var Album = require('../models/artist');
var Video = require('../models/video');

//metodo para obtener el video

function getVideo(req, res) {
    var videoId = req.params.id;

    Video.findById(videoId).populate({
        path: 'artist'
    }).exec((err, video) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!video) {
                res.status(404).send({
                    message: 'No existe el video'
                });
            } else {
                res.status(200).send({
                     video
                });
            }
        }
    });



}

//metodo para guardar un video
function saveVideo(req, res) {
    var video = new Video();
    var params = req.body;
    video.number = params.number;
    video.name = params.name;
    video.duration = params.duration;
    video.file = params.file;
    video.album = params.album;

    video.save((err, videoStored) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el servidor'
            });
        } else {
            if (!videoStored) {
                res.status(404).send({
                    message: 'No se a guardado el video'
                });
            } else {
                res.status(200).send({
                    video: videoStored
                });
            }
        }
    });

}
//metodo para actualizar videos
function updateVideo(req,res){
    var videoId = req.params.id;
    var update = req.body;

    Video.findByIdAndUpdate(videoId,update,(err,videoUpdate) =>{
        if (err) {
            res.status(500).send({message:'Error en el servidor'});
        } else {
            if (!videoUpdate) {
                res.status(404).send({message:'No se ha actualizado el video'});
            } else {
                res.status(200).send({video:videoUpdate});
            }
        }
    });

}

     
//Metodo para listar los videos
function getVideos(req, res) {

    Video.find(function (err, videos) {
        if (err) {
            res.status(422);
            res.json({ error: err });
        }
        res.status(200);
        res.json(videos);
    });
}
//metodo para borrar un video
function deleteVideo(req,res){
   Video.findByIdAndRemove(req.params.id, (err, videoRemoved) => {

        if (err) {
            res.status(500).send({ message: 'Error al elimiar video' });

        } else {
            if (!videoRemoved) {
                res.status(404).send({ message: 'No se ha podido eliminar el video' });
            } else {
                res.status(200).send({ message: 'Video eliminado' });
            }
        }


    });
}
//metodo para subir el fichero de video
function uploadFile(req, res) {
    var videoId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.file.path; //fichero el cual va a subir

        var file_split = file_path.split('\/'); //recortar para obtener el nombre de la imagen


        var file_name = file_split[2]; //se recoje el campo 3 del arreglo, porque ahi se encuentra el nombre de la imagen

        var ext_split = file_name.split('\.'); //se recorta para obtner la extencion del archivo

        var file_ext = ext_split[1]; //se recoje el campo 2. porque ahi esta la extencion despues del split
     
        if (file_ext == 'mp4' || file_ext == '3gp' || file_ext == 'webm'|| file_ext == 'm4a') { //se pregunta si las extenciones estan correctas
            Video.findByIdAndUpdate(videoId, {
                file: file_name
            }, (err, videoUpdate) => {
              
                if (!videoUpdate) {
                    res.status(404).send({
                        message: "no se ha podido actualizar el Video"
                    });

                } else {
                    res.status(200).send({
                        video: videoUpdate
                    });
                }

            });



        } else {
            res.status(200).send({
                message: 'Extencion del archivo no valida'
            });
        }




    } else {
        res.status(200).send({
            message: 'No a subido ningun video..'
        });
    }

};

//metodo para obtner archivo
function getVideoFile(req, res) {
    var videoFile = req.params.videoFile;
    var path_file = './uploads/videos/' + videoFile;

    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({
                message: 'No existe el video..'
            });
        }
    });
}


//metodo para exportar los metodos dentro del archivo
module.exports = {
    getVideo,
    saveVideo,
    getVideos,
    updateVideo,
    deleteVideo,
    uploadFile,
    getVideoFile
}
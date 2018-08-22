'use strict'

var path = require('path');
var fs = require('fs');

var mongoosePaginate = require('mongoose-pagination');
var Artist = require('../models/artist');
var Album = require('../models/albums');
var Video = require('../models/video');


//metodo para obtener el album
function getAlbum(req, res) {

    var albumId = req.params.id;
    console.log(albumId);


    Album.findById(albumId).populate({
        path: 'artist'
    }).exec((err, album) => { //path propiedad donde se van a cargar los datos, en este caso seria a artist

        if (err) {
            res.status(500).send({
                message: 'Error en la peticion hacia la base de datos'
            });
        } else {
            if (!album) {
                res.status(404).send({
                    message: 'El album no existe.'
                });

            } else {
                res.status(200).send({
                    album
                });

            }
        }
    });

};

//metodo para guardar un album
function saveAlbum(req, res) {
    var album = new Album();
    var params = req.body;

    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = 'null';
    album.artist = params.artist;


    album.save((err, albumStored) => {
        if (err) {
            res.status(500).send({
                message: "Error en el servidor"
            });
        } else {
            if (!albumStored) {
                res.status(404).send({
                    message: "No se ha guardado el album"
                });
            } else {
                res.status(200).send({
                    albumStored
                });

            }
        }
    });

}

//Metodo para obtener todos los albums

function getAlbums(req, res) {
    var artistId = req.params.artist;
    if (!artistId) {
        //sacar todos los albums de la base de datos
        var find = Album.find({}).sort('title');
    } else {
        //sacar los albums de un artista concreto de la base de datos
        var find = Album.find({
            artist: artistId
        }).sort('year');

    }
    find.populate({
        path: 'artist'
    }).exec((err, albums) => { //llenar los datos de artista en los campos de artista que estan dentro de los albums
        if (err) {
            res.status(500).send({
                message: 'Error en la peticion...'
            });
        } else {
            if (!albums) {
                res.status(404).send({
                    message: 'No se encontro ningun album'
                });

            } else {
                res.status(200).send({
                    albums
                });

            }
        }
    });

}

//Metodo para modificar un album
function updateAlbum(req, res) {
    var albumId = req.params.id;
    var update = req.body;

    Album.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el servidor'
            });
        } else {
            if (!albumUpdated) {
                res.status(404).send({
                    message: 'No se actualizo el album'
                });

            } else {
                res.status(200).send({
                    album: albumUpdated
                });

            }
        }
    });

}

//metodo para eliminar un album
function deleteAlbum(req, res) {
    var albumId = req.params.id;
    Album.findByIdAndRemove(albumId, (err, albumRemoved) => {
        if (err) {
            res.status(500).send({
                message: 'Error al eliminar el album'
            });
        } else {
            if (!albumRemoved) {
                res.status(404).send({
                    message: 'El album no ha sido eliminado'
                });

            } else {
                Video.find({
                    album: albumRemoved._id
                }).remove((err, videoRemoved) => {
                    if (err) {
                        res.status(500).send({
                            message: 'Error al eliminar el video'
                        });

                    } else {
                        if (!videoRemoved) {
                            res.status(404).send({
                                message: 'El video no ha sido eliminado'
                            });

                        } else {
                            res.status(200).send({
                                album: albumRemoved
                            });

                        }
                    }
                });
            }
        }
    });

}
//metodo para subir una imagen para el album
function uploadImage(req, res) {
    var albumId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.image.path; //fichero el cual va a subir

        var file_split = file_path.split('\/'); //recortar para obtener el nombre de la imagen


        var file_name = file_split[2]; //se recoje el campo 3 del arreglo, porque ahi se encuentra el nombre de la imagen

        var ext_split = file_name.split('\.'); //se recorta para obtner la extencion del archivo

        var file_ext = ext_split[1]; //se recoje el campo 2. porque ahi esta la extencion despues del split
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') { //se pregunta si las extenciones estan correctas
            Album.findByIdAndUpdate(albumId, {
                image: file_name
            }, (err, albumUpdated) => {
                if (!albumUpdated) {
                    res.status(404).send({
                        message: "no se ha podido actualizar el album"
                    });

                } else {
                    res.status(200).send({
                        album: albumUpdated
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
            message: 'No a subido ninguna imagen..'
        });
    }

};
//metodo para obtener la imagen del album

function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './uploads/albums/' + imageFile;

    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({
                message: 'No existe la imagen..'
            });
        }
    });
}



//metodo para exportar los metodos dentro de este hoja
module.exports = {
    getAlbum,
    saveAlbum,
    getAlbums,
    updateAlbum,
    deleteAlbum,
    uploadImage,
    getImageFile
}
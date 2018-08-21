'use strict'

var path = require('path');
var fs = require('fs');

var mongoosePaginate = require('mongoose-pagination');
var Artist = require('../models/artist');
var Album = require('../models/albums');
var Song = require('../models/song');


//metodo para obtener el artista 
function getArtist(req, res) {
    var artistId = req.params.id;
    Artist.findById(artistId, (err, artist) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la peticion'//error cuando se consulta al servidor
            });
        } else {
            if (!artist) {
                res.status(404).send({
                    message: 'El artista no existe'//a la hora de preguntar, no se encontro el artista
                });
            } else {
                res.status(200).send({artist});//devuelve el artista encontrado en formato json
            }
        }
    });


};

//funcion para guardar el artista
function saveArtist(req, res) {
    var artist = new Artist();
    var params = req.body;
    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'null';

    artist.save((err, artistStored) => {

        if (err) {
            res.status(500).send({
                message: 'Error al guardar el artista'
            });
        } else {
            if (!artistStored) {
                res.status(404).send({
                    message: 'El artista no ha  sido guardado'
                });
            } else {
                res.status(200).send({
                    artist: artistStored
                });
            }
        }
    });

}


//metodo para traer todos los artistas de la base de datos
function getArtists(req,res){
    if ( req.params.page) {
        var page = req.params.page;
    }else{
        var page = 1;
    }
   
    var itemsPerPage = 3;

    Artist.find().sort('name').paginate(page,itemsPerPage, function(err,artists,total){
        if (err) {
            res.status(500).send({message: 'Error en la peticion'});
        } else {
            if (!artists) {
                res.status(404).send({
                    message: 'No hay artistas!!'
                });
            } else {
                return res.status(200).send({total_items:total, artists:artists});
            }
        }
    });

}

//funcion para actualizar los datos
function updateArtist(req,res){
    var artistId = req.params.id;
    var update = req.body;

    Artist.findByIdAndUpdate(artistId,update,(err,artistUpdate)=>{
        if (err) {
            res.status(500).send({message:'Error al actualizar el artista'});
        } else {
            if (!artistUpdate) {
                res.status(404).send({message:"El artista no ha sido actualizado"});
            }else{
                res.status(200).send({artist:artistUpdate});
            }
        }
    });
}
//metodo para borrar un artista y todo lo que este encadenado a el
function deleteArtist(req,res){
    var artistId = req.params.id;
    Artist.findByIdAndRemove(artistId,(err,artistRemoved)=>{
        if (err) {
            res.status(500).send({message:"Error al elimimar el artista"});
        } else {
            if (!artistRemoved) {
                    res.status(404).send({message:"El artista no se ha eliminado"});
            }else{
              
                Album.find({artist:artistRemoved._id}).remove((err,albumRemoved)=>{
                    if (err) {
                        res.status(500).send({message: "Error al eliminar el album perteneciente al artista "+artistRemoved});
                    }else{
                        if(!albumRemoved){
                            res.status(404).send({message:"El album no a sido eliminado"})
                        }else{
                            res.status(200).send({albumRemoved});
                            Song.find({album:artistRemoved._id}).remove((err,songRemoved)=>{
                                if (err) {
                                    res.status(500).send({message: "Error al eliminar las canciones"});
                                }else{
                                    if(!songRemoved){
                                        res.status(404).send({message:"Las canciones no han sido eliminadas"})
                                    }else{
                                        res.status(200).send({artist:artistRemoved});
                                       
                                    }
                                }
                            });
                        }
                    }
                });

            }
        }
    });
}
//metodo para subir una imagen para el artista
function uploadImage(req, res) {
    var artistId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.image.path; //fichero el cual va a subir

        var file_split = file_path.split('\/'); //recortar para obtener el nombre de la imagen


        var file_name = file_split[2]; //se recoje el campo 3 del arreglo, porque ahi se encuentra el nombre de la imagen

        var ext_split = file_name.split('\.'); //se recorta para obtner la extencion del archivo

        var file_ext = ext_split[1]; //se recoje el campo 2. porque ahi esta la extencion despues del split
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') { //se pregunta si las extenciones estan correctas
            Artist.findByIdAndUpdate(artistId, {
                image: file_name
            }, (err, artistUpdate) => {
                if (!artistUpdate) {
                    res.status(404).send({
                        message: "no se ha podido actualizar el artista"
                    });

                } else {
                    res.status(200).send({
                        artist: artistUpdate
                    });
                }

            });



        } else {
            res.status(200).send({
                message: 'Extencion del archivo no valida'
            });
        }


        console.log(ext_split);

    } else {
        res.status(200).send({
            message: 'No a subido ninguna imagen..'
        });
    }

};
//metodo para obtener la imagen del artista

function getImageFile(req,res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/artist/'+imageFile;
    console.log(path_file);
    fs.exists(path_file,function(exists){
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({
                message: 'No existe la imagen..'
            });
        }
    });
}



//metodo para exportar los metodos
module.exports = {
    getArtist,
    saveArtist,
    getArtists,
    updateArtist,
    deleteArtist,
    uploadImage,
    getImageFile
};
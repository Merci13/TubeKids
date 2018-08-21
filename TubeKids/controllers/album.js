'use strict'

var path = require('path');
var fs = require('fs');

var mongoosePaginate = require('mongoose-pagination');
var Artist = require('../models/artist');
var Album = require('../models/albums');
var Song = require('../models/song');


//metodo para obtener el album
function getAlbum(req, res) {
       
    var albumId =req.params.id;
   console.log(albumId);
    

    Album.findById(albumId).populate({path:'artist'}).exec((err, album)=>{//path propiedad donde se van a cargar los datos, en este caso seria a artist
      
        if (err) {
               res.status(500).send({message:'Error en la peticion hacia la base de datos'});
        } else {
      if (!album) {
           res.status(404).send({message:'El album no existe.'});
              
            }else{
                 res.status(200).send({album});
    
            }
        }
    });

};

//metodo para guardar un album
function saveAlbum(req,res){
    var album = new Album();
    var params = req.body;

    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = 'null';
    album.artist = params.artist;
    

    album.save((err,albumStored)=>{
        if (err) {
            res.status(500).send({message: "Error en el servidor"});
        } else {
            if (!albumStored) {
                res.status(404).send({message:"No se ha guardado el album"});
            }else{
                res.status(200).send({albumStored});

            }
        }
    });

}

//Metodo para obtener todos los albums

function getAlbums(req,res){
    var artistId = req.params.artist;
    if(!artistId){
        //sacar todos los albums de la base de datos
        var find = Album.find({}).sort('title');
    }else{
        //sacar los albums de un artista concreto de la base de datos
        var find = Album.find({artist : artistId}).sort('year'); 

    }
    find.populate({path:'artist'}).exec((err,albums)=>{//llenar los datos de artista en los campos de artista que estan dentro de los albums
        if (err) {
            res.status(500).send({message: 'Error en la peticion...'});
        } else {
            if (!albums) {
                res.status(404).send({message: 'No se encontro ningun album'});

            }else{
                res.status(200).send({albums});

            }
        }
    });

}

//Metodo para modificar un album
function updateAlbum(req,res){
    var albumId = req.params.id;
    var update = req.body;

    Album.findByIdAndUpdate(albumId, update,(err,albumUpdated)=>{
        if (err) {
            res.status(500).send({message: 'Error en el servidor'});
        } else {
            if (!albumUpdated) {
            res.status(404).send({message: 'No se actualizo el album'});
                
            } else {
            res.status(200).send({album:albumUpdated});
                
            }
        }
    });

}

//metodo para eliminar un album
function deleteAlbum(req, res){
    var albumId = req.params.id;
    Album.findByIdAndRemove( albumId,(err,albumRemoved)=>{
        if (err) {
            res.status(500).send({message:'Error al eliminar el album'});
        } else {
            if (!albumRemoved) {
            res.status(404).send({message:'El album no ha sido eliminado'});
                
            } else {
                Song.find({album:albumRemoved._id}).remove((err,songRemoved)=>{
                    if (err) {
                    res.status(500).send({message:'Error al eliminar la cancion'});
                        
                    } else {
                        if (!songRemoved) {
            res.status(404).send({message:'La cancion no ha sido eliminada'});
                            
                        } else {
            res.status(200).send({album:albumRemoved});
                            
                        }
                    }
                });
            }
        }
    });

}



//metodo para exportar los metodos dentro de este hoja
module.exports = {
    getAlbum,
    saveAlbum,
    getAlbums,
    updateAlbum,
    deleteAlbum
}
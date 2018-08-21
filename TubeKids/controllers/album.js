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



//metodo para exportar los metodos dentro de este hoja
module.exports = {
    getAlbum,
    saveAlbum
}
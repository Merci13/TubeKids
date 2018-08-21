'use strict'

var path = require('path');
var fs = require('fs');

var mongoosePaginate = require('mongoose-pagination');
var Artist = require('../models/artist');
var Album = require('../models/albums');
var Song = require('../models/song');


//metodo para obtener el artista 
function getAlbum(req, res) {
    res.status(200).send({message: 'accion get album'});


};

//metodo para guardar un album
function saveAlbum(req,res){
    var album = new Album();
    var params = req.body;

    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = 'null';
    album.Artist = params.artist;
    

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
'use strict'

var path = require('path');
var fs = require('fs');

var mongoosePaginate = require('mongoose-pagination');
var Artist = require('../models/artist');
var Album = require('../models/albums');
var Song = require('../models/video');

//metodo para obtener el video

function getVideo(req,res){
    res.status(200).send({message:'Respuesta del controlador de video'});
}

//metodo para guardar un video
function saveVideo(req,res){


}



//metodo para exportar los metodos dentro del archivo
module.exports ={
    getVideo
}
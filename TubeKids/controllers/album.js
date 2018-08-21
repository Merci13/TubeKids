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



module.exports = {
    getAlbum
}
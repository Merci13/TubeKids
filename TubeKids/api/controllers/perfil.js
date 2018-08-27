'use strict'

var path = require('path');
var fs = require('fs');

var mongoosePaginate = require('mongoose-pagination');
var Artist = require('../models/artist');
var Album = require('../models/artist');
var Video = require('../models/video');
var Perfil = require('../models/perfil');

//metodo para obtener el video

function getPerfil(req, res) {
    var perfilId = req.params.id;

    Perfil.findById(perfilId).populate({
        path: 'artist'
    }).exec((err, perfil) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!video) {
                res.status(404).send({
                    message: 'No existe el perfil'
                });
            } else {
                res.status(200).send({
                    perfil
                });
            }
        }
    });



}

//metodo para guardar un video
function savePerfil(req, res) {
    var perfil = new Perfil();
    var params = req.body;
    perfil.name = params.name;
    perfil.username = params.username;
    perfil.age = params.age;
    perfil.pin = params.pin;
    perfil.userId = params.userId;

    perfil.save((err, perfilStored) => {
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
                    perfil: perfilStored
                });
            }
        }
    });

}
//metodo para actualizar videos
function updatePerfil(req,res){
    var perfilId = req.params.id;
    var update = req.body;

    Perfil.findByIdAndUpdate(perfilId,update,(err,pefilUpdate) =>{
        if (err) {
            res.status(500).send({message:'Error en el servidor'});
        } else {
            if (!pefilUpdate) {
                res.status(404).send({message:'No se ha actualizado el video'});
            } else {
                res.status(200).send({perfil:pefilUpdate});
            }
        }
    });

}

     
//Metodo para listar los videos
function getPerfiles(req, res) {

    Perfil.find(function (err, perfiles) {
        if (err) {
            res.status(422);
            res.json({ error: err });
        }
        res.status(200);
        res.json(perfiles);
    });
}
//metodo para borrar un video
function deletePerfil(req,res){
   Perfil.findByIdAndRemove(req.params.id, (err, perfilRemoved) => {

        if (err) {
            res.status(500).send({ message: 'Error al elimiar perfil' });

        } else {
            if (!perfilRemoved) {
                res.status(404).send({ message: 'No se ha podido eliminar el perfil' });
            } else {
                res.status(200).send({ message: 'perfil eliminado' });
            }
        }


    });
}



//metodo para exportar los metodos dentro del archivo
module.exports = {
    getPerfil,
    savePerfil,
    getPerfiles,
    updatePerfil,
    deletePerfil
}
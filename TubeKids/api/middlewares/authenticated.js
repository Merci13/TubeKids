'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_curso';


//Recibe todos los parametros que tenga una peticion http:
exports.ensureAuth = function(req,res,next){//el next es para salir del middleware

    if (!req.headers.authorization) {//en caso de que no exista el header
        return res.status(403).send({message: 'La peticion no tiene la cabecera de autenticacion'});
    }

    var token = req.headers.authorization.replace(/['"]+/g,''); // eliminar las posibles comillas que traiga el token
  //decodificar el token 
    try {
        var payload = jwt.decode(token,secret);//decodificar el token y pasarle la clave secreta para decodificar el token
        if (payload.exp <= moment().unix()) {//si la fecha de expiracion es menor o igual que la fecha actual
            return res.status(401).send({message: 'El token ha expirado'})
        }



    } catch (error) {
        console.log(error.message)
        return res.status(404).send({message: 'Token no valido'})
    }
    req.user = payload; // con esto tenemos un objeto user disponible para usar
    next();//metodo para salir del middleware
};
'use strict'

var fs = require('fs'); //modulo de file system
var path = require('path'); // acceder a rutas concretas
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');


function pruebas(req, res) {
    res.status(200).send({
        message: 'Probando una accion del controlador de usarios del api rest con Node y Mongo'
    })

}
//Metodo para guardar un usuario a la base de datos de mongo..

function saveUser(req, res) {
    var user = new User();



    var params = req.body;

    console.log(params);
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = params.image;

    console.log(user);

    if (params.password) {
        //encriptar contrasenna y guardar datos
        bcrypt.hash(params.password, null, null, function (err, hash) {
            user.password = hash;
            if (user.name != null && user.surname != null && user.email != null) {
                //guarde el usuario
                user.save((err, userStored) => {
                    if (err) {
                        res.status(500).send({
                            message: 'Error al guardar el usuario'
                        });
                    } else {
                        if (!userStored) {
                            res.status(404).send({
                                message: 'No se a registrado el usuario'
                            });
                        } else {
                            res.status(200).send({
                                user: userStored
                            });
                        }
                    }
                })

            } else {
                res.status(200).send({
                    message: "Introduce todos los datos"
                });
            }
        });
    } else {
        res.status(200).send({
            message: "Introduce la contrasenna"
        });
    }
} //fin del saveUser

function loginUser(req, res) {


    var params = req.body; //se combierte a un objeto json

    var email = params.email;
    var password = params.password;

    User.findOne({
        email: email.toLowerCase() //convertir a todo en minuscula
    }, (err, user) => {

        if (err) {
            res.status(500).send({
                message: "Error en la peticion"
            });
        } else {

            if (!user) {
                res.status(404).send({
                    message: "El usuario no existe"
                });

            } else {

                //Comprobar la contrasenna
                bcrypt.compare(password, user.password, function (err, check) {
                    if (check) {
                        //devolver los datos del usuario logeado
                        if (params.gethash) {
                            console.log('las contrasenna coincide y devuelve el token')
                            //devolver un token JWT
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });

                        } else {
                            console.log('la contrasenna no coincide devuelve el user')
                            res.status(200).send({
                                user
                            });
                        }
                    } else {
                        res.status(404).send({
                            message: "El usuario no ha podido logearse"
                        });
                    }
                })
            }
        }
    });
};


// funcion para actualizar los datos del usuario
function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;

    if (userId != req.user.sub) {
       return res.status(500).send({
            message: 'No tienes permiso para actualizar este usuario'
        });
    }


    User.findByIdAndUpdate(userId, update, (err, userUpdated) => { //se le pasa el user id del usuario a actualizar
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar el usuario'
            });


        } else {
            if (!userUpdated) {
                res.status(404).send({
                    message: "no se ha podido actualizar el usuario"
                });

            } else {
                res.status(200).send({
                    user: userUpdated
                });
            }

        }
    });

};

//funcion para subir imagen de avatar de usuario
function uploadImage(req, res) {
    var userId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.image.path; //fichero el cual va a subir

        var file_split = file_path.split('\/'); //recortar para obtener el nombre de la imagen


        var file_name = file_split[2]; //se recoje el campo 3 del arreglo, porque ahi se encuentra el nombre de la imagen

        var ext_split = file_name.split('\.'); //se recorta para obtner la extencion del archivo

        var file_ext = ext_split[1]; //se recoje el campo 2. porque ahi esta la extencion despues del split
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') { //se pregunta si las extenciones estan correctas
            User.findByIdAndUpdate(userId, {
                image: file_name
            }, (err, userUpdated) => {
                if (!userUpdated) {
                    res.status(404).send({
                        message: "no se ha podido actualizar el usuario"
                    });

                } else {
                    res.status(200).send({
                        user: userUpdated
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

//metodo para obtener la imagen de usuario

function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './uploads/users/' + imageFile;
    console.log(path_file);
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

//Metodo para exportar las clases y poder usarlos en cualquier lugar..

module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
};
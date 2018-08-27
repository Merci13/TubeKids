'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PerfilSchema= Schema({
    name: String,
    username: String,
    userId: String,
    pin: String,
   age: String


});

module.exports = mongoose.model('Perfil',PerfilSchema);
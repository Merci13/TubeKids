'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideoSchema= Schema({
    number: String,
    name: String,
    duration: String,
    file: String,
    album:{type: Schema.ObjectId, ref: 'Artist'}


});

module.exports = mongoose.model('Video',VideoSchema);
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideoSchema= Schema({
    number: String,
    name: String,
    duration: String,
    file: String,
    userId:{type: Schema.ObjectId, ref: 'User'}


});

module.exports = mongoose.model('Video',VideoSchema);
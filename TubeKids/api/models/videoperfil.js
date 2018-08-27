'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideoPSchema= Schema({
    userId: String,
    videoId : String
});

module.exports = mongoose.model('videop',VideoPSchema);
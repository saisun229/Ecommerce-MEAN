'use strict';
var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    img: { data: Buffer, contentType: String }
});
var Image = mongoose.model('Images', schema);
mongoose.connect('mongodb://127.0.0.1:27017/buyItDB');
var saveImage= function(filePath, contentType, callback){
  var image = new Image;
  image.img.data = fs.readFileSync(filePath);
  image.img.contentType = contentType;
  image.save(callback);
};

var getImage = function(id, callback){
  Image.findById(id, callback);
};
module.exports = {saveImage, getImage}

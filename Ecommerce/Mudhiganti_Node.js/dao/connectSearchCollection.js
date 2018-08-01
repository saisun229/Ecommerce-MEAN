'use strict';
let {searchHistory} = require('./schema.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var searchSchema = new Schema(searchHistory);
var SearchModel = mongoose.model('buyitUsers', searchSchema);
mongoose.connect('mongodb://127.0.0.1:27017/buyItDB');
let updateSearchHistory = function(obj, callback){
  SearchModel.update({_id: obj.id}, { "$set":{ keywords : obj.keywords, updateddon : obj.updatedon }}).exec(callback);
};
let fetchSearchHistory = function(userid, callback){
  SearchModel.find({userid: userid}).sort({updatedon : 1}).exec(callback);
};
let saveSearchHistory = function(obj, callback){
  SearchModel(obj).save(callback);
};

module.exports = {updateSearchHistory, fetchSearchHistory, saveSearchHistory} ;

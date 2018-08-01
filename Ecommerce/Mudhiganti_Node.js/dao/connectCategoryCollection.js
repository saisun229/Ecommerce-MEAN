'use strict';
let {category} = require('./schema.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var categorySchema = new Schema(category);
var CategoryModel = mongoose.model('category', categorySchema);
var AutoIncrement = require('mongoose-sequence')(mongoose);
categorySchema.plugin(AutoIncrement, {inc_field: 'categoryid'});

mongoose.connect('mongodb://127.0.0.1:27017/buyItDB');

let fetchCategories = function(callback){
  CategoryModel.find({}, callback);
};
let saveCategory = function(newCategory, callback){
  newCategory.createddon = new Date();
  CategoryModel(newCategory).save(callback);
};
let removeCategory = function(categoryid, callback){
  CategoryModel.findOneAndRemove({categoryid: categoryid}, callback);
};

module.exports = {fetchCategories, saveCategory, removeCategory};

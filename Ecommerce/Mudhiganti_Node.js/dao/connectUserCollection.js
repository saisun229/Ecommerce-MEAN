'use strict';
let {user} = require('./schema.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema(user);
  var UserModel = mongoose.model('users', userSchema);
var AutoIncrement = require('mongoose-sequence')(mongoose);
userSchema.plugin(AutoIncrement, {inc_field: 'userid'});

mongoose.connect('mongodb://127.0.0.1:27017/buyItDB');
let fetchUser = function(email, callback){
  UserModel.find({email: email}, callback);
};
let saveUser = function(newUserObj, callback){
  UserModel(newUserObj).save(callback);
};
let updateUser = function(userObj, callback){
  UserModel.update({_id: userObj.id}, { "$set":userObj.updateFields}, callback);
};
let getUser = function(id, callback){
  UserModel.find({userid:id}, callback);
};
let getUserGroup = function(users, callback){
    UserModel.find({userid: {$in:users}}, callback);
};
let updateAmount= function(userObj, callback){
    UserModel.update({userid: userObj.userid}, { "$set":{ amount : userObj.amount}}, callback);
};
let getAdminUser= function(callback){
    UserModel.find({isAdmin: true}, callback);
};
let getUserList = function(callback){
     UserModel.find({isAdmin: {$ne:true}}).select({password:0}).exec(callback);
};
module.exports = {fetchUser, saveUser, updateUser, getUser, getUserGroup, updateAmount, getAdminUser, getUserList};

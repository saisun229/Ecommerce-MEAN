'use strict';
let {messages} = require('./schema.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var messagesSchema = new Schema(messages);
var MessagesModel = mongoose.model('messages', messagesSchema);
mongoose.connect('mongodb://127.0.0.1:27017/buyItDB');

let postMsg = function(msgObj, callback){
  MessagesModel(msgObj).save(callback);
};

let getUnredCount = function(receiver, callback){
  MessagesModel.count({receiver: receiver, receiverreadstatus:false }, callback);
};

let removeSoldMsgs = function(productId, callback){
  MessagesModel.remove({itemid: productId}, callback);
};

let getMsgs = function(userid, callback){
  var queryObj = {
    $or : [
      {sender : userid},
      {receiver : userid}
    ]
  };
  MessagesModel.find(queryObj).sort({timestamp : -1}).select({__v:0,_id:0}).exec(callback);
};

let setMsgsAsRead = function(obj, callback){
  MessagesModel.update({receiver : obj.userid, sender : obj.conversationUser }, {"$set":{receiverreadstatus: true}}, {multi: true}, callback);
};
module.exports = {getUnredCount, postMsg, getMsgs, removeSoldMsgs, setMsgsAsRead};

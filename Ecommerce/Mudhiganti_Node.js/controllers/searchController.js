'use strict';
let {updateSearchHistory, fetchSearchHistory, saveSearchHistory} = require('../dao/connectSearchCollection');
let updateSearchDB = function(updateObj, callback){
  fetchSearchHistory(updateObj.userid, function(err, data){
    if(err){
      callback(err);
    } else {
      if(data.length < 5){
        updateObj.updatedon = new Date();
        updateObj.createddon = new Date();
        saveSearchHistory(updateObj, callback);
      } else {
        updateObj.id = data[0]._id;
        updateObj.updatedon = new Date();
        updateSearchHistory(updateObj, callback);
      }
    }
  });
};
let getSearchHistory = function(userid, callback){
  fetchSearchHistory(userid, function(err, data){
    if(err){
      callback(err);
    } else{
      let keywords = [];
      for(var i =0 ; i< data.length; i++){
        keywords[i] = data[i].keywords;
      }
      callback(null, keywords)
    }
  })
};
module.exports = { updateSearchDB, getSearchHistory };

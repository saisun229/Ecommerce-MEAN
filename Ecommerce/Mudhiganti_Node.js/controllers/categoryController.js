'use strict'
let {fetchCategories, saveCategory, removeCategory} = require('../dao/connectCategoryCollection');

let addCategory = function(req, res, next){
  saveCategory(req.body, function(err){
    if(err){
      res.status(500);
      res.send({errorMsg: "DB Connection error"});
    } else{
        res.send({successMsg: "succerssfully added category"});
    }
  });
};
let getCategories = function(req, res, next){
  fetchCategories(function(err, data){
    if(err){
      res.status(500);
      res.send({errorMsg: "DB Connection error"});
    } else{
        res.send(data);
    }
  });
};
let deleteCategory = function(req, res, next){
  if(req.body.categoryid){
    removeCategory(req.body.categoryid, function(err){
      if(err){
        res.status(500);
        res.send({errorMsg: "DB Connection error"});
      } else{
          res.send({successMsg: "category succerssfully removed"});
      }
    });
  } else{
    res.status(401);
    res.send({errorMsg: "Select category id to remove"});
  }
};
module.exports = {addCategory, getCategories, deleteCategory };

'use strict';
let {product} = require('./schema.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = new Schema(product);
var ProductModel = mongoose.model('productsCollection', productSchema);
var AutoIncrement = require('mongoose-sequence')(mongoose);
productSchema.plugin(AutoIncrement, {inc_field: 'itemid'});

mongoose.connect('mongodb://127.0.0.1:27017/buyItDB');

let insertProduct = function(productObj, callback){
  ProductModel(productObj).save(callback);
};
let removeProduct = function(itemid, callback){
  ProductModel.findOneAndRemove({itemid: itemid}, callback);
};
let updateProductDetail = function(productObj, callback){
  ProductModel.update({itemid : productObj.itemid}, { "$set":productObj.updateFields}, callback);
};
let fetchProduct = function(itemid, callback){
  ProductModel.find({itemid:itemid}, callback);
};
let getCount = function(query, callback){
  ProductModel.count(query, callback)
};
let findProducts = function(searchObj, pageInfo, callback){
  let queryObj = { status: "AVL"}, sortObj = {}, skipCount = 0;
  if(searchObj.keywords){
    queryObj.$or =[];
    queryObj.$or.push({keywords: {$in: searchObj.keywords}});
  }
  if(searchObj.categoryids){
    queryObj.$or = queryObj.$or ? queryObj.$or :[];
    queryObj.$or.push({categoryids : {$in:searchObj.categoryids}});
  }
  if(searchObj.priceLowToHigh){
    sortObj.price = 1;
  }else if(searchObj.priceHighToLow){
    sortObj.price = -1;
  } else {
    sortObj.itemid = -1;
  }
  if(pageInfo.pageNo && pageInfo.pageNo > 1){
    skipCount = (pageInfo.pageNo - 1) * 20;
  }
  sortObj.itemid = -1;
    console.log("====queryObj=>", queryObj);
    console.log("====sortObj=>", sortObj);
    console.log("====skipCount=>", skipCount);



  ProductModel.find(queryObj).sort(sortObj).skip(skipCount).limit(20).exec(function(err, result){
    console.log("=====>", err);
    if(err || result.length == 20 || !(searchObj.keywords || searchObj.categoryid)){
      callback(err, result);
    } else {
      getCount(queryObj, function(err, count){
        if(err) {
          callback(err, result);
        } else {
          if(skipCount > 0){
            skipCount = skipCount - count;
          }
          queryObj = { status: "AVL"};
          if(searchObj.keywords){
            queryObj.keywords = {$nin: searchObj.keywords};
          }
          if(searchObj.categoryids){
            queryObj.categoryids = {$nin:searchObj.categoryids};
          }
          ProductModel.find(queryObj).sort(sortObj).skip(skipCount).limit(20 - result.length).exec(function(err, data){
            callback(err, result.concat(data));
          });
        }
      });
    }
  });
};
let fetchSoldProducts = function(userid, callback){
    let queryObj = {sellerid: userid, status: { $ne:"AVL"}};
    ProductModel.find(queryObj).sort({itemid:-1}).exec(callback);
};
let fetchAvailbleProducts = function(userid, callback){
  let queryObj = {sellerid: userid, status: "AVL"};
  ProductModel.find(queryObj).sort({itemid:-1}).exec(callback);
};
let getProductGroup = function(productids, callback){
    ProductModel.find({itemid: {$in:productids}}, callback);
};
module.exports = {insertProduct, removeProduct, updateProductDetail, fetchProduct, findProducts, fetchSoldProducts, fetchAvailbleProducts, getProductGroup};

'user strict';
let {insertProduct, removeProduct, updateProductDetail, fetchProduct, findProducts, fetchSoldProducts, fetchAvailbleProducts} = require('../dao/connectProductCollection');
let {updateSearchDB, getSearchHistory } = require('./searchController');
let {removeMsgsForProduct} = require('./message');
let {updateUserAmount} = require('./userController');
let addProduct = function(req, res, next){
      req.body.sellerid = req.body.sellerid || req.session.userid;
      let keywords = req.body.keywords.toUpperCase().split(',');
      req.body.keywords = [];
      for(var i=0; i< keywords.length; i++){
        req.body.keywords = req.body.keywords.concat(keywords[i].split(' '));
      }
      req.body.status = "AVL";
      req.body.createdon = new Date();
      req.body.updatedon = new Date();
      insertProduct(req.body, function(err, data){
        if(err){
          res.status(500);
          res.send({errorMsg: "DB Connection error"});
        } else {
          res.send(data);
        }
      });
};
let updateProduct = function(req, res, next){
  let updateObj = {itemid: req.query.itemid || req.body.itemid};
  if(req.query.itemid || req.body.itemid){
    updateObj.updateFields = {};
    if(req.body.categoryids){
      updateObj.updateFields.categoryids = req.body.categoryids;
    }
    if(req.body.productname){
      updateObj.updateFields.productname = req.body.productname;
    }
      if(req.body.keywords){
      let keywords = req.body.keywords.toUpperCase().split(',');
      req.body.keywords = [];
      for(var i=0; i< keywords.length; i++){
        req.body.keywords = req.body.keywords.concat(keywords[i].split(' '));
      }
      updateObj.updateFields.keywords = req.body.keywords;
    }
    if(req.body.description){
      updateObj.updateFields.description = req.body.description;
    }
    if(req.body.imageids){
      updateObj.updateFields.imageids = req.body.imageids;
    }
    if(req.body.price){
      updateObj.updateFields.price = req.body.price;
    }
    if(req.body.status){
      updateObj.updateFields.status = req.body.status;
    }
    if(req.body.soldon){
      updateObj.updateFields.soldon = new Date(req.body.soldon);
    }
    updateProductDetail(updateObj, function(err, result){
      if(err){
        res.status(500);
        res.send({errorMsg: "DB Connection error"});
      } else {
        removeMsgsForProduct(updateObj.itemid, function(err, data){
          res.send({successmsg: "updated successfully"});
        });
      }
    });
  } else {
    res.status(401);
    res.send({errorMsg: "please provide itemid"});
  }
};
let getProduct = function(req, res, next){
  if(req.query.itemid){
    fetchProduct(req.query.itemid, function(err, data){
      if(err){
        res.status(500);
        res.send({errorMsg: "DB Connection error"});
      } else {
        res.send(data);
      }
    });
  } else {
    res.status(401);
    res.send({errorMsg: "please provide itemid"});
  }
};
let deleteProduct = function(req, res, next){
  if(req.query.itemid){
    removeProduct(req.query.itemid, function(err, data){
      if(err){
        res.status(500);
        res.send({errorMsg: "DB Connection error"});
      } else {
        res.send({successMsg: "item removed successfully"});
      }
    });
  } else {
    res.status(401);
    res.send({errorMsg: "please provide itemid"});
  }
};
let searchProducts = function(req, res, next){
  var findProductsCallback  = function(err, data){
    console.log("");
    if(err){
      res.status(500);
      res.send({errorMsg: "DB Connection error"});
    } else {
      res.send(data);
    }
  };
  if(req.body.userid || req.query.userid){
    if(req.body.keywords){
      updateSearchDB({keywords : req.body.keywords.toUpperCase(), userid: req.body.userid || req.query.userid}, function(err){
        if(err){
          res.status(500);
          res.send({errorMsg: "DB Connection error1"});
          return;
        } else{
          let keywords = req.body.keywords.toUpperCase().split(',');
          req.body.keywords = [];
          for(var i=0; i< keywords.length; i++){
            req.body.keywords = req.body.keywords.concat(keywords[i].split(' '));
          }
          findProducts(req.body, req.query, findProductsCallback);
        }
      });
    } else if(req.body.categoryids && req.body.categoryids.length){
      findProducts(req.body, req.query, findProductsCallback);
    } else {
      getSearchHistory(req.body.userid || req.query.userid, function(err, userKeywords){
        if(err){
          res.status(500);
          res.send({errorMsg: "DB Connection error"});
          return;
        } else{
          if(userKeywords.length){
            req.body.keywords = [];
            for(var i=0; i< userKeywords.length; i++){
                req.body.keywords = req.body.keywords.concat(userKeywords[i].split(' '));
            }
          }
          console.log("========", req.body);
          console.log("========", req.query);

          findProducts(req.body,  req.query, findProductsCallback);
        }
      });
    }
  } else {
    res.status(401);
    res.send({errorMsg: "Please provide userid"});
  }
};
let getSoldProducts = function(req, res, next){
  if(req.query.userid){
    fetchSoldProducts(req.query.userid, function(err, data){
      if(err){
        res.status(500);
        res.send({errorMsg: "DB Connection error"});
      } else {
        res.send(data);
      }
    });
  } else {
    res.status(401);
    res.send({errorMsg: "please provide userid"});
  }
};
let getAvailableProducts= function(req, res, next){
  if(req.query.userid){
    fetchAvailbleProducts(req.query.userid, function(err, data){
      if(err){
        res.status(500);
        res.send({errorMsg: "DB Connection error"});
      } else {
        res.send(data);
      }
    });
  } else {
    res.status(401);
    res.send({errorMsg: "please provide userid"});
  }
};
let buyProduct = function(req, res, next){
    if(req.body.userid && req.body.sellerid && req.body.amount && req.body.itemid ){
        console.log("=======1====>",req.body );
        updateUserAmount(req.body.sellerid, req.body.amount, function(err){
            if(err){
                res.status(401);
                res.send({errorMsg: err});
            } else{
                req.body.status = 'SOLD';
                updateProduct(req, res, next);
            }
        });
    } else {
      res.status(401);
      res.send({errorMsg: "please provide valid userid, sellerid, amount"});
    }
}

module.exports = {addProduct, updateProduct, getProduct, deleteProduct, searchProducts, getSoldProducts, getAvailableProducts, buyProduct};

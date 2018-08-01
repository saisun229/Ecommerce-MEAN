'use strict'
let {fetchUser, saveUser, updateUser, getUser, updateAmount, getAdminUser, getUserList} = require('../dao/connectUserCollection'),
    shortid = require('shortid');

let createUser = function(req, res, next){
  if(req.body.email){
    fetchUser(req.body.email, function(err, data){
      if(err){
        console.log(err);
        res.status(500);
        res.send({errorMsg: "DB Connection error"});
      } else if(data.length > 0){
        res.status(401);
        res.send({errorMsg: "User already registered"});
      } else {
        req.body.rating = 0 ;
        req.body.amount = 0 ;
        req.body.noofrates = 0 ;
        req.body.createdon = new Date();
        req.body.updatedon = new Date();
        req.body.permissions = ['SL', 'BY'];
        req.body.isAdmin = false;
        saveUser(req.body, function(error){
          if(error){
            res.status(500);
            res.send({errorMsg: "DB Connection error"});
          } else{
            fetchUser(req.body.email, function(err, data){
              if(err){
                console.log(err);
                res.status(500);
                res.send({errorMsg: "DB Connection error"});
              } else {
                req.session.userInfo = {
                  firstname: req.body.firstname,
                  lastname:req.body.lastname,
                  email: req.body.email,
                  permissions: req.body.permissions,
                  amount : 0,
                  isAdmin : req.body.isAdmin,
                  userid: data[0].userid
                };
                res.send({
                  firstname: req.body.firstname,
                  lastname:req.body.lastname,
                  email: req.body.email,
                  amount : 0,
                  isAdmin : req.body.isAdmin,
                  permissions: req.body.permissions,
                  userid: data[0].userid
                });
              }
            });
          }
        });
      }
    });
  }
};
let updateUserDetails = function(req, res, next){
  if(req.body.email || req.session.userInfo.email){
    fetchUser(req.body.email || req.session.userInfo.email, function(error, data){
      console.log('data',data);
      if(error){
        res.status(500);
        res.send({errorMsg: "DB Connection error"});
      } else{
        var updateObj = {
          id : data[0]._id,
          updateFields: {
            updatedon: new Date()
          }
        };
        if(req.body.firstname){
          updateObj.updateFields.firstname = req.body.firstname;
        }
        if(req.body.lastname){
          updateObj.updateFields.lastname = req.body.lastname;
        }
        if(req.body.password){
          updateObj.updateFields.password = req.body.password;
        }
        if(req.body.address){
          updateObj.updateFields.address = req.body.address;
        }
        if(req.body.mobile){
          updateObj.updateFields.mobile = req.body.mobile;
        }
        updateUser(updateObj, function(error, userDetails){
          if(error){
            res.status(500);
            res.send({errorMsg: "DB Connection error"});
          } else {
            res.send(userDetails);
          }
        });
      }
    });
  } else{
    res.status(401);
    res.send({errorMsg : "your session expired"});
  }
};

let verifyUser = function(req, res, next){

  console.log("=======1r=====>", req.body);
  if(req.body.email){
    fetchUser(req.body.email, function(err, user){
      if(err){
        res.status(500);
        res.send({errorMsg: "DB Connection error"});
      } else {
        if(user[0] && req.body.password.toString() === user[0].password.toString()){
          console.log("=======aldnlnasl=====>", user);
            req.session.userInfo = {
              email : user[0].email,
              firstname : user[0].firstname,
              lastname : user[0].lastname,
              permissions: user[0].permissions,
              isAdmin : user[0].isAdmin,
              amount : user[0].amount,
              userid: user[0].userid
            };
            res.send( {
              email : user[0].email,
              firstname : user[0].firstname,
              lastname : user[0].lastname,
              permissions: user[0].permissions,
              isAdmin : user[0].isAdmin,
              amount : user[0].amount,
              userid: user[0].userid
            });
        } else {
          res.status(401);
          res.send({errorMsg: "User Doen't exist or invalid credentials"});
        }
      }
    });
  } else{
    res.status(401);
    res.send({errorMsg : "Provide valid email id"});
  }
};

let rateSeller = function(req, res, next){
  if(req.body.sellerid && req.body.rating){
    getUser(req.body.sellerid, function(err, result){
      if(err || !result.length){
        res.status(500);
        res.send({errorMsg: "DB Connection error"});
      } else {
        var noofrates = result[0].noofrates ? result[0].noofrates : 0;
        var rating = result[0].rating ? result[0].rating : 0;
        rating = (rating*noofrates + req.body.rating)/(noofrates + 1);
        var updateObj = {
          id : result[0]._id,
          updateFields: {
            rating : rating,
            noofrates: noofrates + 1,
            updatedon: new Date()
          }
        };
        updateUser(updateObj, function(error, userDetails){
          if(error){
            res.status(500);
            res.send({errorMsg: "DB Connection error"});
          } else {
            res.send(userDetails);
          }
        });
      }
    });
  } else{
    res.status(401);
    res.send({errorMsg : "Provide valid information"});
  }
};
let fetchUserInfo = function(req, res, next){
  if(!req.query.userid){
    res.status(401);
    res.send({errorMsg : "Provide user id"});
  } else {
    getUser(req.query.userid, function(err, data){
      console.log('fetchdata:::',data);
      if(err || !data.length){
        res.status(500);
        res.send({errorMsg: "DB Connection error or no user"});
      } else {
        res.send({"userid": data[0].userid,
          "firstname": data[0].firstname,
          "lastname": data[0].lastname,
          "email": data[0].email,
          "rating": data[0].rating,
          "noofrates": data[0].noofrates,
          "mobile": data[0].mobile,
          "address":data[0].address,
          "password":data[0].password,
        });
      }
    });
  }
};
let updateUserAmount = function(userid, amount, callback){

    getAdminUser(function(err, result){
        if(err || result.length == 0){
            callback("DB error or Admin not found");
        } else {
            let admin_amount = (result[0].amount) + parseFloat(amount/10);
            amount = parseFloat(amount) - parseFloat(amount/10);
            updateAmount({userid : result[0].userid, amount : admin_amount.toFixed(2)}, function(err){
                if(err){
                    callback("Admin amount update failed");
                } else {
                  getUser(userid, function(err, data){
                      if(err){
                        return callback("Admin amount update failed");
                      }
                      console.log("==admin_amount====>",admin_amount);
                      console.log("===amount1213===>",amount);
                      console.log("==data====>",data[0]);

                      updateAmount({userid : userid, amount : data[0].amount + parseFloat(amount.toFixed(2))},  function(err){
                          if(err){
                              callback("User amount update failed");
                          } else {
                              callback(null);
                          }
                      });
                  });
                }
            });
        }
    });
};
let getAllUsers = function(req, res, next){
    getUserList( function(err, result){
        if(err){
          res.status(500);
          res.send({errorMsg: "DB Connection error or no user"});
      } else {
          res.send(result);
      }
    });
};
module.exports = {createUser, updateUserDetails, verifyUser, rateSeller, fetchUserInfo, updateUserAmount, getAllUsers};

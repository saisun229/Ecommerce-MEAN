'use strict';
let {getUnredCount, postMsg, getMsgs, removeSoldMsgs, setMsgsAsRead} =  require('../dao/connectMsgCollection');
let {getUserGroup} = require('../dao/connectUserCollection');
let {getProductGroup} = require('../dao/connectProductCollection');
let _ = require('underscore');
let getAllMsgs = function(req, res, next){
  if(req.query.userid){
    getMsgs(req.query.userid, function(err, data){
      if(err){
        console.log(err);
        res.status(500);
        res.send({errorMsg: "DB Connection error"});
      } else {
        let dataGroupBy = _.groupBy(data, 'sender');
        let sentMessages = dataGroupBy[req.query.userid];
        let productGroup = _.groupBy(data, 'itemid')
        delete dataGroupBy[req.query.userid];
        let users = Object.keys(dataGroupBy);
        users.push(req.query.userid);
        var recieveGroup =  _.groupBy(data, 'receiver');
        var recieveUsers =  _.uniq(Object.keys(recieveGroup));
        var diffRecieveUsers = _.difference(recieveUsers, users);
        let products = Object.keys(productGroup);
        users = _.uniq(users.concat(diffRecieveUsers));
        if(users.length > 1 && products.length > 0){
            getUserGroup(users, function(err, userInfos){
                if(err){
                  console.log(err);
                  res.status(500);
                  res.send({errorMsg: "DB Connection error"});
                 } else {
                      getProductGroup(products, function(err, productInfos){
                         if(err){
                            console.log(err);
                            res.status(500);
                            res.send({errorMsg: "DB Connection error"});
                        } else{
                             var dummyData =[];
                             for(var i=0; i< data.length ;i++){
                                dummyData[i] ={};
                                dummyData[i].itemid = data[i].itemid;
                                dummyData[i].sender = data[i].sender;
                                dummyData[i].receiver = data[i].receiver;
                                dummyData[i].message = data[i].message
                                dummyData[i].receiverreadstatus = data[i].receiverreadstatus;
                                var userInfo = _.find(userInfos, { userid : parseInt(data[i].sender)});
                                dummyData[i].senderName = userInfo.firstname + ' ' + userInfo.lastname;
                                dummyData[i].timestamp = data[i].timestamp;
                                var sentOn = new Date(data[i].timestamp);
                                dummyData[i].sentOn = sentOn.getFullYear() + '/' + (sentOn.getMonth() + 1) + '/' + sentOn.getDate() + ' '
                                                    + sentOn.getHours() + ':' + sentOn.getMinutes() + ':' + sentOn.getSeconds();
                             }
                             dataGroupBy = _.groupBy(dummyData, 'sender');
                             recieveGroup =  _.groupBy(dummyData, 'receiver');
                             let sentMessages = dataGroupBy[req.query.userid];
                             let sentGroupBy =  _.groupBy(sentMessages, 'receiver');
                             let result = [];
                             for(var i=0; i < users.length   ; i++){
                                 var messages = [];
                                 if(diffRecieveUsers.includes(users[i]) && users[i] != req.query.userid){
                                     messages = messages.concat(sentGroupBy[users[i]]);
                                     console.log("=====>"+users[i]+"=======?", messages);

                                 }

                                 if(users[i] != req.query.userid && !diffRecieveUsers.includes(users[i])){
                                     messages = messages.concat(dataGroupBy[users[i]]);
                                 }
                                 var resultTemp = {};
                                 resultTemp.unreadCount = _.size(_.where(messages, {receiverreadstatus: false}));
                                 if(users[i] != req.query.userid && !(diffRecieveUsers.includes(users[i]))){
                                     messages = messages.concat(_.where(sentMessages, {receiver : parseInt(users[i])}));
                                 }

                                console.log("=====>"+users[i]+"=======?", messages);
                                 messages=_.sortBy(messages, 'timestamp');

                                 if(messages.length > 0){
                                     var convesationUserId = (messages[0].sender != req.query.userid) ? messages[0].sender : messages[0].receiver;
                                     var convUser = _.find(userInfos, { userid : parseInt(convesationUserId)});
                                     resultTemp.convesationUserId = convesationUserId;
                                     resultTemp.conversationWith = convUser.firstname;
                                     var groupByProduct = _.groupBy(messages, 'itemid');
                                     for (var key in groupByProduct){
                                         if (groupByProduct.hasOwnProperty(key)) {
                                             resultTemp.itemId = key;
                                             var productInfo =  _.find(productInfos , {itemid : parseInt(key)});
                                             resultTemp.productName = productInfo.productname;
                                             resultTemp.messages = groupByProduct[key];
                                             result.push(resultTemp);
                                         }
                                     }
                                }
                             }
                             res.send(result);
                         }
                    });
                  }
            });
        } else {
            res.send([]);
        }
      }
    });
  } else{
    res.status(401);
    res.send({errorMsg: "please provide user id"});
  }
};
let sendMsg = function(req, res, next){
  if(req.body.itemid && req.body.sender && req.body.receiver && req.body.message){
    req.body.senderreadstatus = true;
    req.body.receiverreadstatus = false;
    req.body.timestamp =  new Date().getTime();
    postMsg(req.body, function(err, data){
      if(err){
        console.log(err);
        res.status(500);
        res.send({errorMsg: "DB Connection error"});
      } else {
        res.send({successMsg: "message sent successfully"});
      }
    });
  } else{
    res.status(401);
    res.send({errorMsg: "please provide itemid and reciever id and message"});
  }
};
let getMsgCount = function(req, res, next){
  if(req.query.receiver){
    getUnredCount(req.query.receiver, function(err, count){
      if(err){
        console.log(err);
        res.status(500);
        res.send({errorMsg: "DB Connection error"});
      } else {
        res.send({count : count});
      }
    });
  } else{
    res.status(401);
    res.send({errorMsg: "please provide reciever id"});
  }
};
let updateMsg = function(req, res, next){
  if(req.body.userid && req.body.conversationUser){
    setMsgsAsRead(req.body, function(err, data){
      if(err){
        console.log(err);
        res.status(500);
        res.send({errorMsg: "DB Connection error"});
      } else {
        res.send(data);
      }
    });
  } else{
    res.status(401);
    res.send({errorMsg: "please provide reciever id"});
  }
};
let removeMsgsForProduct = function(productId, callback){
  removeSoldMsgs(productId, callback);
};
module.exports = {getAllMsgs, sendMsg, getMsgCount, removeMsgsForProduct, updateMsg};
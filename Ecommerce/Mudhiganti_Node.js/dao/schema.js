'use strict';
let user = {
  "userid": Number,
  "firstname": String,
  "lastname": String,
  "email": String,
  "password": String,
  "permissions": [String],
  "isAdmin": Boolean,
  "rating": Number,
  "amount": Number,
  "noofrates": Number,
  "mobile": Number,
  "address":String,
  "updatedon": Date,
  "createdon": Date
};
let product= {
  "itemid": Number,
	"sellerid": Number,
	"categoryids": [Number],
	"description": String,
	"productname": String,
	"keywords": [String],
  "imageid": String,
	"price": Number,
	"status": String,
	"soldon": Date,
	"updateddon": Date,
	"createddon": Date
};
let category={
  "categoryid": Number,
	"categroryDesc": String,
	"createddon": Date
};
let searchHistory= {
  "userid" : Number,
	"keywords": String,
	"updateddon" : Date,
	"createddon" : Date
};
let messages= {
  "itemid": Number,
	"sender": Number,
	"receiver": Number,
	"message": String,
  "senderreadstatus": Boolean,
  "receiverreadstatus": Boolean,
	"timestamp": Number
};
module.exports = {user, product, category, searchHistory, messages};

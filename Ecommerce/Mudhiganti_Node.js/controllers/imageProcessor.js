'use strict';
let {saveImage, getImage} = require('../dao/imageCollection');

let uploadImage = function(req, res, next){
  if (!req.files){
    res.status(400);
    res.send({errMsg: "Please upload valid image."});
    return;
  } else {
    let imagePath = __dirname+ '/' + req.files.image.name;
    req.files.image.mv(imagePath, function(err) {
      if (err){
        res.status(400);
        res.send({errMsg: "Image Upload failed"});
        return;
      } else {
        saveImage(imagePath, req.files.image.mimetype, function(err, data){
          if(err){
            res.status(500);
            res.send({errMsg: "DB Error"});
            return;
          }
          require('fs').unlinkSync(imagePath);
          res.send({successMsg: "Image Upload successfully", id: data._id});
          return;
        });
      }
  });
  }
};
let downloadimage = function(req, res, next){
  if(req.query.id){
    getImage(req.query.id, function(err, doc){
      if(err){
        res.status(500);
        res.send({errMsg: "please provide proper image id"});
        return;
      } else {
         if(doc){
            res.contentType(doc.img.contentType);
            res.send(doc.img.data);
        } else {
            res.status(401);
        }
      }
    });
  } else{
    res.status(400);
    res.send({errMsg: "missing image id"});
    return;
  }

};
module.exports = {uploadImage, downloadimage};

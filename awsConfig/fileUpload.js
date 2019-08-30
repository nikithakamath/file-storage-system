'use strict';

const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

const config = require('./config');

AWS.config.update({
  region: config.REGION,
  accessKeyId: config.ACCESS_KEY_ID,
  secretAccessKey: config.SECRET_ACCESS_KEY,
});

let s3 = new AWS.S3();

const s3Upload = multer({
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: config.BUCKET_NAME,
    key: function (req, file, cb) {
      let extension = path.extname(file.originalname);
      let fileName = path.basename(file.originalname, extension);
      cb(null, fileName + new Date().getTime() + extension);
    }
  })
});

/**
@module s3Upload
*/
module.exports.s3Upload = s3Upload;
/**
* @function deleteS3File
* @param {String} key
* @returns {Promise}
*/
module.exports.deleteS3File = function(key) {
  new Promise(function(resolve, reject) {
    let deleteParams = {
      Bucket: config.BUCKET_NAME,
      Key: key,
    };
    s3.deleteObject(deleteParams, function(err, data) {
      if(!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}

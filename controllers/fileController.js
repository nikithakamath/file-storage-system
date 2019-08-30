'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const rateLimit = require('express-rate-limit');

const fileUpload = require('../awsConfig/fileUpload');
const singleUpload = fileUpload.s3Upload.single('input');

let File = require('../models/file');
const constants = require('../helpers/constants');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limits to 10 requests per windowMs
    message: {reply: false, data:'Too many requests!!'}
});
/**
* @class
*/
class FileController {
  /**
   * @param {String} mimeType
   * @returns {Number}
   */
  static getFileType(mimeType) {
    switch (mimeType) {
      case 'image/png':
      case 'image/jpeg':
      case 'image/gif':
          return constants.FILE_TYPE.IMAGE;
          break;

      case 'video/mpeg':
          return constants.FILE_TYPE.VIDEO;
          break;

      case 'audio/mpeg':
          return constants.FILE_TYPE.AUDIO;
          break;

      case 'application/pdf':
          return constants.FILE_TYPE.PDF;
          break;

      default:
          return constants.FILE_TYPE.OTHER;
          break;
    }
  }
  /**
   * @param {Object} request
   * @param {Object} response
   */
  addFile(request, response) {
    singleUpload(request, response, function(err) {
      if(!err) {
        const newFile = new File({
          fileName: request.file.key,
          fileExtension: path.extname(request.file.originalname),
          fileType: FileController.getFileType(request.file.mimetype),
          fileSize: request.file.size,
          timestamp: new Date().getTime(),
          fileURL: request.file.location,
          fileStatus: constants.FILE_STATUS.PRESENT
        });
        newFile.save()
          .then((savedData) => {
            response.status(201).json({
              success: true,
              reply: savedData
            });
          })
          .catch((error) => {
            response.status(404).json({
              success: false,
              reply: error
            });
          })
      } else {
        response.status(404).json({
          success: false,
          reply: err
        });
      }
    });
  }
  /**
   * @param {Object} request
   * @param {Object} response
   */
  getFile(request, response) {
    File.findOne({_id: request.params.id, fileStatus: constants.FILE_STATUS.PRESENT})
      .then((fileInfo) => {
        if(fileInfo) {
          response.status(200).json({
            success: true,
            reply: fileInfo
          });
        } else {
          response.status(404).json({
            success: false,
            reply: 'Requested file does not exist'
          });
        }
      })
      .catch((error) => {
        response.status(404).json({
          success: false,
          reply: error
        });
      });
  }
  /**
   * @param {Object} request
   * @param {Object} response
   */
  deleteFile(request, response) {
    File.findOneAndUpdate({_id: request.params.id}, {fileStatus: constants.FILE_STATUS.ABSENT}, {new: true})
      .then((fileInfo) => {
        return fileUpload.deleteS3File(fileInfo.fileName);
      })
      .then(() => {
        response.status(200).json({
          success: true,
          reply: 'File deleted successfully'
        });
      })
      .catch((error) => {
        response.status(404).json({
          success: false,
          reply: error
        });
      });
  }
}

let fileControllerObj = new FileController();

router.post('/', limiter, fileControllerObj.addFile);
router.get('/:id', fileControllerObj.getFile);
router.delete('/:id', fileControllerObj.deleteFile);

module.exports = fileControllerObj;
module.exports = router;

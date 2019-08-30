'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
* @class FileSchema
*/
const FileSchema = new Schema({
  fileName: String,
  fileExtension: String,
  fileType: Number,
  fileSize: Number,
  timestamp: Number,
  fileURL:String,
  fileStatus: Number
});

const File = mongoose.model('file', FileSchema);

module.exports = File;

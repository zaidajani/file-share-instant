const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  }
});

const FileNames = mongoose.model('files', schema);

module.exports = { 
  FileNames,
  schema
}
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/photo_app');

var db = mongoose.connection;
db.on('error', console.error.bind(console, '链接错误'));
var schema = new mongoose.Schema({
  name: String,
  path: String
});

module.exports = mongoose.model('Photo', schema);


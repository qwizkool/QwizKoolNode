var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var url = 'mongodb://localhost:27017/qwizkool';
var conn = mongoose.createConnection(url);


module.exports.mongoose = mongoose;
module.exports.Schema = Schema;
module.exports.conn = conn;


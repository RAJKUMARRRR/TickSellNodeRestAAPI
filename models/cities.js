var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CitiesSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Cities', CitiesSchema);
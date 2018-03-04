var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var HallsSchema   = new Schema({
    name: String,
    location: String,
    timings: [{show_time:String}]
});

module.exports = mongoose.model('Halls', HallsSchema);
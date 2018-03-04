var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ReviewsSchema   = new Schema({
    user_id: String,
    user_name: String,
    image_url: String,
    movie_id:String,
    title: String,
    heighlites: [String],
    drawbacks: [String],
    analysis: String,
    tagline:String,
    rating: String,
    timestamp:{type:Date,default:Date.now}
});

module.exports = mongoose.model('Reviews', ReviewsSchema);
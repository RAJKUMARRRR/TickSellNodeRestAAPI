var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MoviesSchema   = new Schema({
    name: String,
    language: String,
    screen: String,
    certificate: String,
    release_date: { type: Date, default: Date.now },
    actors:String,
    jonour: String,
    synopsis:String,
    likes:Number,
    dislikes:Number,
    rating:String,
    is_released:Boolean,
    trailer_link:String,
    image:String,
    isDeleted: Boolean,
    alt_image:String//{ data: Buffer, contentType: String }
});

module.exports = mongoose.model('Movies', MoviesSchema);
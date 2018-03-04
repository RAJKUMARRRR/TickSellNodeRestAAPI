var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SellersSchema   = new Schema({
    name:String,
    movie_name: String,
    movie_id:String,
    tickets: Number,
    price: Number,
    hall_name:String,
    hall_id:String,
    location:String,
    show_time:String,
    mobile:Number,
    user_id:String,
    comments:String,
    language:String,
    date:{type:Date,default: Date.now},
    email:String,
    image_url:String,
    timestamp:{type:Date,default: Date.now}
});

module.exports = mongoose.model('Sellers', SellersSchema);
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UsersSchema   = new Schema({
    name: String,
    mobile: String,
    email: String,
    profile_image_url: String,
    password: String,
    liked: String,
    disliked: String
    
});

module.exports = mongoose.model('Usera', UsersSchema);
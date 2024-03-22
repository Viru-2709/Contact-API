const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username :  String,
    firstname : String,
    lastname : String,
    email : String,
    password : String
});

const USER= mongoose.model('user', userSchema);

module.exports = USER
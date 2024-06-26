const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    firstname:String,
    lastname:String,
    username: String,
    email: String,
    password: String
});

const ADMIN = mongoose.model('admin', adminSchema);

module.exports = ADMIN

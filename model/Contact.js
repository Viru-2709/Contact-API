const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    Username: String,
    firstname: String,
    lastname: String,
    email: String,
    number: Number,
    officeadd: String,
    homeadd: String,
    username: { type: mongoose.Types.ObjectId, ref: 'user' }
});

const CONTACT = mongoose.model('contact', contactSchema);

module.exports = CONTACT
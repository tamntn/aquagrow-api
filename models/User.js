var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Creating a Schema for users
const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model('users', userSchema);

module.exports = User;
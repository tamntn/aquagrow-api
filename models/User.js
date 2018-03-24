var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

// Creating a Schema for users
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Hash password 'before' save
userSchema.pre('save', function (next) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
        user.password = bcrypt.hashSync(user.password, salt);
        next();
    } else {
        next();
    }
})

const User = mongoose.model('users', userSchema);

module.exports = User;
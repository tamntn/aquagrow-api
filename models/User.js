var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

// Creating a Schema for users
const UserSchema = new Schema({
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
UserSchema.pre('save', function (next) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
        user.password = bcrypt.hashSync(user.password, salt);
        next();
    } else {
        next();
    }
})

// Before removing an user, also remove the System associated with it
UserSchema.pre('remove', function (next) {
    const System = mongoose.model('system');

    System.findOneAndRemove({ user: this._id })
        .then(() => next())
})

const User = mongoose.model('users', UserSchema);

module.exports = User;
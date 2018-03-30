var mongoose = require('mongoose');
var moment = require('moment');
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
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    joined: {
        type: Date,
        required: true
    },
    zipCode: String,
    phone: String,
    zone: {
        type: Schema.Types.ObjectId,
        ref: 'zone'
    },
    portfolio: {
        type: Schema.Types.ObjectId,
        ref: 'portfolio',
    },
    // TODO: Add notifications/reminders
});

// Hash password 'before' save
// Also created joined timestamp
UserSchema.pre('save', function (next) {
    const user = this;
    user.joined = moment().format();
    
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
        .catch((err) => {
            console.log(err);
        })
})

const User = mongoose.model('users', UserSchema);

module.exports = User;
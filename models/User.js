const mongoose = require('mongoose');
const bcryptjs = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
        select: false,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    role: {
        type: String,
        enum: ['sv', 'lqc','ironsv','user','pm','apm','pincharge','fquality','fincharge','fcontroller','qamanager','admin'],
        default: 'user',
    },
    officeIdCardNumber: {
        type: String,
        required: [true, 'Please provide an office id card number'],
        unique: true,
    },
    phone:{
        type: String,
        required: [true, 'Please provide a phone number'],
        unique: true,
    },
    floor:{
        type: String,
        enum: ['4','5','6',],
        required: [true, 'Please provide a floor'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
});

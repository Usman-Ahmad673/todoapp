const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true,"Please Enter Your Name"],
        maxLength: [30,"Name Cannot Exceed 30 Letters"],
        minLength: [4,"Name Cannot less 4 Letters"],
        unique: true,
    },
    password : {
        type: String,
        required: [true,"Please Enter Your Password"],
        minLength: [8,"Password Cannot less 8 Letters"],
        // select: false,
    },
    todos: [{
        todo: {
            type: String,
        },
        marked: {
            type: Boolean,
            default: false,
        },
    }],
})



// JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, 'asdfghjklzxcvbnmqwertyuiopasdfgh', {
        expiresIn: 30, // Set the expiration time to 30 seconds
    });
};


module.exports = mongoose.model('User', userSchema)
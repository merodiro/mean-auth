const mongoose  = require('mongoose')
const bcrypt    = require('bcryptjs')
const config    = require('../config/database')

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = module.exports = mongoose.model('User', UserSchema)

module.exports.find = function(id, callback) {
    return User.findById(id, callback)
}

module.exports.findByUsername = function(username, callback) {
    const query = { username: username }
    return User.findOne(query, callback)
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err
            newUser.password = hash
            newUser.save(callback)
        })
    })
}

module.exports.comparePassword = function(password, hash, callback) {
    bcrypt.compare(password, hash, (err, isMatch) => {
        if(err) throw err
        callback(null, isMatch)
    })
}
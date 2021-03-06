const express   = require('express')
const router    = express.Router()
const passport  = require('passport')
const jwt       = require('jsonwebtoken')
const config    = require('../config/database')

const User = require('../models/user')

router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    })
    User.addUser(newUser, (err, user) => {
        if(err) {
            if (err.code === 11000) {
                res.json({
                    success: false,
                    msg: 'username or email already exist'
                })
            } else {
                res.json({
                    success: false,
                    msg: 'failed to register user'
                })
            }
        } else {
            const token = jwt.sign(user, config.secret, {
                expiresIn: 6048000
            })

            res.json({
                success: true,
                msg: 'User registered successfully',
                token: 'JWT ' + token
            })
        }
    })

})

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    User.findByUsername(username, (err, user) => {
        if (err) throw err

        if (!user){
            return res.json({
                success: false,
                msg: 'User not found'
            })
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err

            if(isMatch){
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 6048000
                })

                res.json({
                    success: true,
                    token: 'JWT ' + token
                })
            } else {
                return res.json({
                    success: false,
                    msg: 'Wrong password'
                })
            }
        })
    })
})

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user })
})

module.exports = router
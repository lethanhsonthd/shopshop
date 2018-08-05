var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var User = require('../models/user')
var SHA256 = require('crypto-js/sha256')

passport.serializeUser((user, done)=>{
    done(null, user.id)
})
passport.deserializeUser((id, done)=>{
    User.findById(id, (err,user)=>{
        done(err,user)
    })
})
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},(username, password, done)=>{
    User.findOne({
        email: username
    },(err,user)=>{
        if (err) return done(err)
        if (!user) {
            console.log('not user')
            return done(null, false,{message: 'User not found'})
        }
        if (user.validPassword(password)==false) {
            return done(null, false, {message: 'Incorrect password'})
        }
        return done(null,user)
    })
}))
module.exports = passport
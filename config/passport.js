var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var User = require('../models/user')
passport.serializeUser((user, done)=>{
    done(null, user.id)
})
passport.deserializeUser((id, done)=>{
    User.findById(id, (err,user)=>{
        done(err,user)
    })
})
passport.use(new LocalStrategy((username, password, done)=>{
    User.findOne({
        username: username
    },(err,user)=>{
        if (err) return done(err)
        if (!user) return done(null, false,{message: 'User not found'})
        if (user.method.validPassword(password)==0) return done(null, false, {message: 'Incorrect password'})
        return done(null,true)
    })
}))
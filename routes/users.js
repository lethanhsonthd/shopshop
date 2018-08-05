var express = require('express');
var router = express.Router();
var csrfProtection = require('csurf')()
var User = require('../models/user')
var validator = require('validator')
var passport = require('../config/passport')
/* GET users listing. */
router.use(csrfProtection)
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
})
var checkLogin = ((req,res,next)=>{
  if (req.isAuthenticated()) next()
  return res.redirect('/users/signin')
})
router.use('/profile',checkLogin)
router.get('/signup',(req,res,next)=>{
  var f = ''
  if (typeof res.locals.sessionFlash != 'undefined') f = res.locals.sessionFlash.message
  res.render('user/signup',{csrf: req.csrfToken(), title: 'Sign up', message: f})
})

router.post('/signup',(req,res,next)=>{
  User.findOne({email: req.body.email},(err,docs)=>{
      if (docs){
        req.session.sessionFlash = {
          message: 'This email is existed. Choose another one!'
        } 
        return res.redirect('/users/signup')
      }
      var newUser = new User()
      if (validator.isEmail(req.body.email)) newUser.email = req.body.email;
      else {
        req.session.sessionFlash = {
          message: 'Email is not correct. Try again'
        }
        return res.redirect('/users/signup')
      }
      if (validator.isLength(req.body.password,{min: 6})) newUser.password = newUser.cryptoPassword(req.body.password)
      else {
        req.session.sessionFlash = {
          message: 'Password must have at least 6 characters'
        }
        return res.redirect('/users/signup')
      }
      if (req.body.password!=req.body.password2){
        req.session.sessionFlash = {
          message: 'Password not match'
        }
        return res.redirect('/users/signup')
      }
      newUser.save(()=>{
        return res.redirect('/users/signin')
      })
  })
})
var pushUserToSession = ((req,res,next)=>{
  req.user = user
  next()
})
router.get('/signin',(req,res,next)=>{
  res.render('user/signin',{csrf: req.csrfToken(),title: 'Sign in'})
})
router.post('/signin',((req,res,next)=>{
  passport.authenticate('local',(err,user,info)=>{
    if (err) console.log('err')
    if (!user) console.log('user khong ton tai')
    if (user){
      req.logIn(user,(err)=>{
        if (err) console.log(err)
        return res.redirect('/')
      })
    }
  })(req,res,next)
}))
router.get('/:email',(req,res,next)=>{
  res.send('ahaha')
})
module.exports = router;

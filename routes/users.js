var express = require('express');
var router = express.Router();
var csrfProtection = require('csurf')()
var User = require('../models/user')
/* GET users listing. */
router.use(csrfProtection)
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup',(req,res,next)=>{
  console.log(req.flash('message'))
  res.render('user/signup',{csrf: req.csrfToken(), title: 'Sign up', message: req.flash('message')})
})

router.post('/signup',(req,res,next)=>{
  User.findOne({email: req.body.email},(err,docs)=>{
      if (docs){
        req.flash('message','Choose another one')
        return res.redirect('/users/signup')
      }
      var newUser = new User()
      newUser.email = req.body.email
      newUser.password = newUser.cryptoPassword(req.body.password)
      newUser.save(()=>{
        return res.redirect('/')
      })
  })
})

module.exports = router;

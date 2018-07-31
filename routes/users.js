var express = require('express');
var router = express.Router();
var csrfProtection = require('csurf')()
/* GET users listing. */
router.use(csrfProtection)
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup',(req,res,next)=>{
  console.log(req.csrfToken())
  res.render('user/signup',{csrf: req.csrfToken(), title: 'Sign up'})
})
module.exports = router;

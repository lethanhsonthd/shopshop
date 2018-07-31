var express = require('express');
var router = express.Router();
var Product = require('../models/product')
var csrfProtection = require('csurf')()
/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find((err,docs)=>{
    var productArr = []
    var promise = new Promise((resolve, reject)=>{
      var done = 0
      for (var i=0;i<docs.length;i++){
        if (done==docs.length-1) {
          resolve(productArr)
        }
        done++
        productArr.push(new Array(docs[i].imagePath,docs[i].title,docs[i].description,docs[i].price))
      }
      reject(console.log('fail'))
    })
    promise.then((data)=>{
      res.render('index',{title: 'Shopping Cart', products: data})
    })
  })
});
router.get('user/signup',(req,res,next)=>{
  res.render('user/signup',{csrf: req.csrfToken})
})
module.exports = router;

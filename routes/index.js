var express = require('express');
var router = express.Router();
var Product = require('../models/product')
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
        //productArr.push(new Array(docs[i].imagePath,docs[i].title,docs[i].description,docs[i].price))
        productArr.push(new Object({
          id: docs[i].id,
          imagePath: docs[i].imagePath,
          title: docs[i].title,
          description: docs[i].description,
          price: docs[i].price
        }))
      }
    })
    promise.then((data)=>{
      res.render('index',{title: 'Shopping Cart', products: data})
    })
  })
});
module.exports = router;

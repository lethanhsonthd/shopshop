var express = require('express');
var router = express.Router();
var Product = require('../models/product')
/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find({},(err,docs)=>{
    console.log(String(docs))
    res.render('index',{title: 'ABCD'})
  })
});

module.exports = router;

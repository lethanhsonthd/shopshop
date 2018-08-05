var express = require('express')
var router = express.Router()
var Cart = require('../models/cart')
var Product = require('../models/product')
router.get('/:id',(req,res,next)=>{
    console.log(req.session.cart)
    cart = new Cart(req.session.cart ? req.session.cart : {})
    Product.findById(req.params.id,(err,res)=>{
        if (err) next(new Error(err))
        cart.add(res)
        cart.show()
        req.session.cart = cart
    })
    return res.redirect('/')
})

module.exports = router
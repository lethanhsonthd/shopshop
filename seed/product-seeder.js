var mongoose = require('mongoose')
var Product = require('../models/product')
mongoose.connect('mongodb://localhost:27017/shoppingcart')
var product = [
    new Product({
        imagePath: 'https://i.ytimg.com/vi/ogEUq109K9Y/maxresdefault.jpg',
        title: 'Doreamon',
        description: 'Truyện tranh doreamon',
        price: 3000,
        unique: true
    }),
    new Product({
        imagePath: 'https://www.detectiveconanworld.com/wiki/images/thumb/6/60/Conan_Edogawa_Profile.jpg/275px-Conan_Edogawa_Profile.jpg',
        title: 'Conan',
        description: 'Truyện tranh Conan',
        price: 2000,
        unique: true
    }),
]
var done = 0
for (var i=0;i<product.length;i++){
    product[i].save((err,res)=>{
        done++
        if (done==product.length) exit()
    })
}
function exit(){
    mongoose.disconnect()
}
var mongoose = require('mongoose')
var Product = require('../models/product')
mongoose.connect('mongodb://localhost:27017/shoppingcart')
var product = [
    new Product({
        imagePath: 'https://i.ytimg.com/vi/ogEUq109K9Y/maxresdefault.jpg',
        title: 'Doreamon',
        description: 'Truyện tranh doreamon',
        price: 3000
    }),
    new Product({
        imagePath: 'https://www.detectiveconanworld.com/wiki/images/thumb/6/60/Conan_Edogawa_Profile.jpg/275px-Conan_Edogawa_Profile.jpg',
        title: 'Conan',
        description: 'Truyện tranh Conan',
        price: 2000
    }),
    new Product({
        imagePath: 'https://static.bandainamcoent.eu/high/dragon-ball/dragonball-xenoverse-2/00-page-setup/dbxv2_game_thumb_408x314_2.jpg',
        title: 'Dragonball',
        price: 1234,
        description: 'Truyen Dragonball Super'
    }),
    new Product({
        imagePath: 'http://image1.infogame.vn/2015/03/18/1_phim-manga_phim-hoat-hinh-shin-cau-be-but-chi-lan-dau-len-song-tai-viet-nam_162849.jpg',
        title: 'Shin - Cậu bé bút chì',
        description: 'Cậu bé dễ thương',
        price: 4567
    }),
    new Product({
        imagePath: 'https://farm8.staticflickr.com/7450/26560846590_95d62b5f72_o.jpg',
        title: 'Nữ hoàng Ai Cập',
        description: 'Câu chuyện rất hay về công chúa và hoàng tử',
        price: 9696
    }),
    new Product({
        imagePath: 'http://hk.dzogame.com/templates_home/images/lgchar3.png',
        title: 'Hiệp khách giang hồ',
        description: 'Câu chuyện kể về các môn phái trong giang hồ',
        price: 5000
    })
]
var done = 0
for (var i=0;i<product.length;i++){
    product[i].save((err,res)=>{
        done++
        if (done==product.length) exit()
    })
}
function exit(){
   // mongoose.disconnect()
}
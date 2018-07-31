var mongoose = require('mongoose')
var Schema = mongoose.Schema
var product = new Schema({
    imagePath: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    }
})
module.exports = mongoose.model('product',product)
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var product = new Schema({
    imagePath: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    }
})
module.exports = mongoose.model('product',product)
var mongoose = require('mongoose')
var CryptoJS = require('crypto-js')
var Schema = mongoose.Schema
var userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
})
userSchema.methods.cryptoPassword = function(password){
    return CryptoJS.HmacSHA1(password,'sondeptrai')
}
userSchema.methods.validPassword = function(password){
    return (String(this.cryptoPassword(password))==this.password)
}
module.exports = mongoose.model('User',userSchema)
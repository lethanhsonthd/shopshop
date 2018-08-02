var mongoose = require('mongoose')
var SHA256 = require('crypto-js/sha256')
var Schema = mongoose.Schema
var userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
})
userSchema.methods.cryptoPassword = function(password){
    return SHA256(password)
}
userSchema.methods.validPassword = function(password){
    return (this.methods.cryptoPassword(password)==userSchema.password)
}
module.exports = mongoose.model('User',userSchema)
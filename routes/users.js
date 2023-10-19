var mongoose = require('mongoose')
var plm = require('passport-local-mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/linkedInDataBase")

const userSchema = mongoose.Schema({
email:String,
name:String,
username:String,
mobilenumber:Number,
password:String
})

userSchema.plugin(plm);

module.exports = mongoose.model('user',userSchema)

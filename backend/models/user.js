const mongoose = require('mongoose');

 const userSchema = mongoose.Schema({
    fullname:String,
    email:String,
    username:String,
    password:String,
    created_on:{type:Date,default:Date.now},
    status:Boolean
});

module.exports = mongoose.model('User',userSchema);
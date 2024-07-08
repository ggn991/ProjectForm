const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    dob:String,
    ad:String,
    add:String,
    city:String,
    state:String,
    pin:String,
    pic:String
});

module.exports = mongoose.model("users",userSchema)
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    image:{
        type:String
    },
    name:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },
    phone:{
        type:String
    },
    address:{
        type:String
    },
    dateofbirth:{
        type:String
    },
    question1:{
        type:String
    },
    question2:{
        type:String
    },
    question3:{
        type:String
    }
})
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('user' , userSchema);

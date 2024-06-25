const mongoose = require('mongoose');

const adminSecretSuccess = new mongoose.Schema({
    date:{type:String, required:true},
    time:{type:String, required:true},
    duration:{type:String, required:true},
    location:{type:String, required:true},
    desc:{type:String, required:true}
},{
    versionKey:false,
    timestamps:true
})

const adminSecretSuccessModel =  mongoose.model("admin_secretSuccess", adminSecretSuccess);

module.exports = adminSecretSuccessModel;
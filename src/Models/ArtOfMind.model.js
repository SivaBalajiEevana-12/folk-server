const mongoose = require('mongoose');

const artOfMindControlSchema = new mongoose.Schema({
    name:{type:String, required:true},
    watsAppNumber:{type:Number, required:true},
    email:{type:String, required:true},
    age:{type:Number,required:true},
    collageOrCompany :{type:String, required:true},
    BranchOfYear :{type:String, required:false},
    registerAmount :{type:String, required:true},
})


const artOfMindControlModel =  mongoose.model("art", artOfMindControlSchema);

module.exports = artOfMindControlModel
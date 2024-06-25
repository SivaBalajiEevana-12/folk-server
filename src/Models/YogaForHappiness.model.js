const mongoose = require('mongoose');

const YogaForHappinessSchema = new mongoose.Schema({
    name:{type:String, required:true},
    watsAppNumber:{type:Number, required:true},
    email:{type:String, required:true},
    age:{type:Number,required:true},
    collageOrCompanY :{type:String, required:true},
    BranchOfYear :{type:String, required:false},
    registerAmount :{type:String, required:true},
},{
    versionKey:false,
    timestamps:true
});


const YogaForHappinessModel =  mongoose.model("yoga", YogaForHappinessSchema);

module.exports = YogaForHappinessModel
const mongoose = require('mongoose');

const adminFestivals = new mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    fromDate:{type:String, required:true},
    toDate:{type:String, required:true},
    img:[{type:String, required:true}],
    location:{type:String, required:true},
    festivalAgenda:[{type:String, required:true}]
},{
    versionKey:false,
    timestamps:true
})

const adminFestivalsModel =  mongoose.model("admin_festival", adminFestivals);

module.exports = adminFestivalsModel;
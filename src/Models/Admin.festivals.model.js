const mongoose = require('mongoose');

const adminFestivals = new mongoose.Schema({
    title:{type:String, required:true},
    desc:{type:String, required:true},
    date:{type:String, required:true},
    from:{type:String, required:true},
    to:{type:String, required:true},
    festivalAgenda:[{type:String, required:true}]
},{
    versionKey:false,
    timestamps:true
})

const adminFestivalsModel =  mongoose.model("admin_festival", adminFestivals);

module.exports = adminFestivalsModel;
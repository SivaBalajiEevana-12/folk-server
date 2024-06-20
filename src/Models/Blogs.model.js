const mongoose = require('mongoose');

const blogsSchema = new mongoose.Schema({
    name:{type:String, required:true},
    date:{type:String, required:true},
    desc:{type:String, required:true},
    image:{type:String,required:true},
})


const blogsModel =  mongoose.model("blogs", blogsSchema);

module.exports = blogsModel
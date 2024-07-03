const mongoose = require('mongoose');

const adminBlogsSchema = new mongoose.Schema({
    date:{type:String, required:true},
    title:{type:String, required:true},
    description:{type:String, required:true},
    img:[{type:String, required:true}]
})


const adminBlogsModel = mongoose.model("adminBlog", adminBlogsSchema);

module.exports = adminBlogsModel;
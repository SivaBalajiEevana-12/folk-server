const mongoose = require('mongoose');

const Connection = ()=>{
    return mongoose.connect("mongodb+srv://fixmymill:QMumND5EEonoWU1T@cluster0.damlyra.mongodb.net/")
}

module.exports = {Connection}